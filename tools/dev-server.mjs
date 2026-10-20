// Session de développement : sert le projet sur un port local, recharge la page à chaque modification
// et ouvre directement une scène.
//
//   npm run scene -- proto            → http://localhost:5173/#proto
//   npm run scene -- content --open   → idem, et ouvre le navigateur
//   npm run scene -- frise --port 5200
//
// Les identifiants de scène sont ceux de l'île JSON : frise, proto, content, assistant, assess,
// organize, care, steer, personalize. Sans identifiant, le deck démarre à l'écran de départ.
//
// Contrairement à dist/ (qui s'ouvre en file://), la session passe par HTTP : le wrapper charge
// directement composition/index.html, aucune reconstruction n'est nécessaire.
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync, watch } from "node:fs";
import { execFileSync, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, normalize, sep } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const scene = args.find((a) => !a.startsWith("--") && !/^\d+$/.test(a)) || "";
const portFlag = args.indexOf("--port");
const port = portFlag >= 0 ? Number(args[portFlag + 1]) : 5173;
const openBrowser = args.includes("--open");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

// Le wrapper contient une copie de l'île JSON : on la resynchronise avant de servir et après chaque
// modification de composition/index.html.
const syncIsland = () => {
  try {
    execFileSync(process.execPath, [join(root, "tools/sync-content.mjs")], { stdio: "inherit" });
    execFileSync(process.execPath, [join(root, "tools/sync-island.mjs")], { stdio: "ignore" });
  } catch (e) {
    console.error("⚠ Synchronisation de l'île impossible :", e.message);
  }
};
syncIsland();

const clients = new Set();
const RELOAD = `<script>new EventSource("/__reload").onmessage=function(){location.reload()};</script>`;

const server = createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/__reload") {
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-store", Connection: "keep-alive" });
    res.write("retry: 500\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }
  let rel = decodeURIComponent(url.pathname);
  if (rel.endsWith("/")) rel += "index.html";
  const file = normalize(join(root, rel));
  // Pas de sortie du dossier du projet, ni de lecture du dépôt git ou des dépendances.
  if (!file.startsWith(root + sep) || /(^|[\\/])(\.git|node_modules)([\\/]|$)/.test(file)) {
    res.writeHead(403).end("Interdit");
    return;
  }
  if (!existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404).end("Introuvable");
    return;
  }
  let body = readFileSync(file);
  if (rel === "/index.html") body = Buffer.from(body.toString("utf8").replace("</body>", RELOAD + "</body>"));
  res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
  res.end(body);
});

let timer = null;
const changed = (dir, name) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    // Seule la composition porte l'île source ; le wrapper (racine) en reçoit la copie.
    if (dir === "content" || (dir === "composition" && String(name || "") === "index.html")) syncIsland();
    for (const c of clients) c.write("data: reload\n\n");
    console.log("↻ rechargé" + (name ? " (" + name + ")" : ""));
  }, 150);
};
for (const dir of ["composition", "content", "."]) {
  watch(join(root, dir), { recursive: dir !== "." }, (_, name) => {
    if (dir === "." && name !== "index.html") return;
    if (name && /(\.hyperframes|\.thumbnails|\.waveform-cache|renders)/.test(name)) return;
    if (dir === "composition" && name === "js/content.js") return; // sortie de sync-content : évite une boucle
    changed(dir, name);
  });
}

server.listen(port, "127.0.0.1", () => {
  const target = `http://localhost:${port}/index.html${scene ? "#" + scene : ""}`;
  console.log(`Session ouverte : ${target}`);
  console.log("Textes : content/*.json. Animations : composition/js/scene-*.js, composition/css/scenes.css ou composition/index.html : la page se recharge toute seule.");
  console.log("Ctrl+C pour arrêter.");
  if (openBrowser) spawn("open", [target], { stdio: "ignore", detached: true }).unref();
});
