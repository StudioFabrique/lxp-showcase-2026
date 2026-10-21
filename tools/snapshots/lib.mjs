// Briques du pipeline de captures : export d'un commit, installation et build éphémères, serveur statique,
// Chrome piloté avec les appels d'API simulés. Aucune base réelle n'est lue ; rien n'est modifié dans le dépôt LXP
// (export par `git archive`, aucun worktree).
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { join, extname } from "node:path";
import puppeteer from "puppeteer-core";

export const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const sh = (cmd, args, opts = {}) => {
  const r = spawnSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1 << 28, ...opts });
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(" ")} : ${(r.stderr || r.stdout || "").split("\n").slice(-12).join("\n")}`);
  return r.stdout;
};

/** Exporte le dossier front du commit dans `dest` (copie propre, sans historique). */
export function exportFront(repo, hash, dest) {
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  const tar = spawnSync("sh", ["-c", `git -C "${repo}" archive ${hash} front | tar -x -C "${dest}"`], { encoding: "utf8" });
  if (tar.status !== 0) throw new Error("git archive : " + tar.stderr);
  return join(dest, "front");
}

/** Chaîne de build du commit, déduite de son package.json. */
export function toolchain(front) {
  const pkg = JSON.parse(readFileSync(join(front, "package.json"), "utf8"));
  const dep = { ...pkg.dependencies, ...pkg.devDependencies };
  if (dep["react-scripts"]) return { kind: "cra", version: dep["react-scripts"] };
  if (dep.vite) return { kind: "vite", version: dep.vite };
  throw new Error("Chaîne de build inconnue");
}

/** Installe les dépendances, construit, puis supprime node_modules (espace disque). Renvoie le dossier statique. */
export function build(front, log = console.log) {
  const tc = toolchain(front);
  log(`  build ${tc.kind} ${tc.version}`);
  const lock = existsSync(join(front, "package-lock.json"));
  const base = ["--no-audit", "--no-fund", "--ignore-scripts"];
  try {
    sh("npm", [lock ? "ci" : "install", ...base], { cwd: front });
  } catch {
    sh("npm", ["install", ...base, "--legacy-peer-deps"], { cwd: front }); // anciens jeux de dépendances incohérents
  }
  try {
    if (tc.kind === "vite") {
      sh("npx", ["--no-install", "vite", "build", "--outDir", "../out", "--emptyOutDir"], { cwd: front, env: { ...process.env, NODE_ENV: "production" } });
      return join(front, "..", "out");
    }
    sh("npx", ["--no-install", "react-scripts", "build"], { cwd: front, env: { ...process.env, CI: "false", BUILD_PATH: "../out", GENERATE_SOURCEMAP: "false", NODE_OPTIONS: "--openssl-legacy-provider" } });
    return join(front, "..", "out");
  } finally {
    rmSync(join(front, "node_modules"), { recursive: true, force: true });
  }
}

const MIME = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".json": "application/json", ".ico": "image/x-icon", ".gif": "image/gif" };

/** Serveur statique avec repli vers index.html (application monopage). */
export function serve(dir) {
  const srv = createServer((req, res) => {
    const u = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let f = join(dir, u);
    if (!f.startsWith(dir) || !existsSync(f) || !statSync(f).isFile()) {
      if (extname(u) && extname(u) !== ".html") return void res.writeHead(404).end();
      f = join(dir, "index.html");
    }
    res.writeHead(200, { "Content-Type": MIME[extname(f)] || "application/octet-stream" });
    res.end(readFileSync(f));
  });
  return new Promise((ok) => srv.listen(0, "127.0.0.1", () => ok({ port: srv.address().port, close: () => srv.close() })));
}

/**
 * Ouvre la page, simule toutes les requêtes fetch / XHR avec `mock(path, method, url)` et prend la capture.
 * `mock` renvoie un corps JSON, ou `{ __status, __body }` pour forcer un statut.
 * `files` : { fragment d'URL → fichier local } ; les requêtes d'images correspondantes sont servies depuis le disque (captures hors ligne).
 */
export async function capture({ dir, route, mock, out, viewport = { width: 1440, height: 900 }, storage = {}, before, wait = 1800, files = {}, log = console.log }) {
  const server = await serve(dir);
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"] });
  const seen = new Set();
  const errors = [];
  try {
    const page = await browser.newPage();
    await page.setViewport(viewport);
    await page.evaluateOnNewDocument((entries) => {
      for (const [k, v] of Object.entries(entries)) localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v));
    }, storage);
    await page.setRequestInterception(true);
    page.on("request", (r) => {
      const t = r.resourceType();
      const local = Object.entries(files).find(([frag]) => r.url().includes(frag));
      if (local) return void r.respond({ status: 200, contentType: MIME[extname(local[1])] || "image/jpeg", headers: { "access-control-allow-origin": "*" }, body: readFileSync(local[1]) });
      if (t === "image" && /\/(uploads|images|media|files)\//.test(r.url())) {
        // Images de contenu (téléversements) : un aplat coloré stable, pour que les listes ne soient pas vides.
        const h = [...r.url()].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 360, 7);
        return void r.respond({ status: 200, contentType: "image/svg+xml", body: `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${h},70%,75%)"/><stop offset="1" stop-color="hsl(${(h + 50) % 360},65%,60%)"/></linearGradient></defs><rect width="320" height="200" fill="url(#g)"/></svg>` });
      }
      if (t !== "fetch" && t !== "xhr") return void r.continue();
      const u = new URL(r.url());
      const path = "/" + u.pathname.replace(/^.*?(undefinedv1|v\d+)\//, "").replace(/^\//, "");
      seen.add(r.method() + " " + path);
      if (/socket\.io/.test(path)) return void r.respond({ status: 200, contentType: "text/plain", body: "" });
      let body = mock(path, r.method(), u);
      let status = 200;
      if (body && typeof body === "object" && "__status" in body) {
        status = body.__status;
        body = body.__body ?? {};
      }
      const origin = r.headers().origin || `http://127.0.0.1:${server.port}`;
      const cors = { "access-control-allow-origin": origin, "access-control-allow-credentials": "true", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
      if (r.method() === "OPTIONS") return void r.respond({ status: 204, headers: cors });
      r.respond({ status, contentType: "application/json", headers: cors, body: JSON.stringify(body ?? {}) });
    });
    page.on("pageerror", (e) => errors.push(e.message.slice(0, 160)));
    await page.goto(`http://127.0.0.1:${server.port}${route}`, { waitUntil: "networkidle0", timeout: 30000 }).catch((e) => errors.push("goto : " + e.message));
    if (before) await before(page);
    await new Promise((r) => setTimeout(r, wait));
    await page.screenshot(out.endsWith(".webp") ? { path: out, type: "webp", quality: 82 } : { path: out, type: "png" });
    log(`  → ${page.url().replace(`http://127.0.0.1:${server.port}`, "")}${errors.length ? " ⚠ " + errors[0] : ""}`);
    return { url: page.url(), seen: [...seen], errors };
  } finally {
    await browser.close();
    server.close();
  }
}
