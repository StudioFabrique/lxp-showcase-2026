// Capture les jalons de content/scenes/closing.json vers composition/assets/snapshots/*.webp.
//
//   node tools/snapshots/run.mjs 11            # un jalon (index de 0 à 11)
//   node tools/snapshots/run.mjs all           # tous ceux qui ont une configuration dans captures.mjs
//   node tools/snapshots/run.mjs 11 --repo ../lxp
//
// Prérequis : `npm install` (puppeteer-core) et Google Chrome. Le dépôt LXP n'est jamais modifié.
import { readFileSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { exportFront, build, capture } from "./lib.mjs";
import { captures } from "./captures.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);
const flag = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const repo = resolve(root, flag("--repo", "../lxp"));
const cache = join(root, ".snapshots-cache");
const valueFlags = ["--repo", "--route", "--out"];
const which =
  args.find(
    (a, i) => !a.startsWith("--") && !valueFlags.includes(args[i - 1]),
  ) || "all";

const snaps = JSON.parse(
  readFileSync(join(root, "content/scenes/closing.json"), "utf8"),
).snapshots;
const todo =
  which === "all" ? Object.keys(captures).map(Number) : [Number(which)];
mkdirSync(cache, { recursive: true });
let failed = 0;
for (const i of todo) {
  const s = snaps[i];
  const cfg = captures[i];
  if (!s || !cfg) {
    console.error(`✗ jalon ${i} : pas de configuration`);
    failed++;
    continue;
  }
  console.log(`[${i}] ${s.date} - ${s.titre} (${s._commit})`);
  try {
    // Le résultat du build est conservé (petit) : les itérations sur les données ne reconstruisent pas.
    const built = join(cache, "out", s._commit);
    if (!existsSync(built) || args.includes("--rebuild")) {
      const front = exportFront(repo, s._commit, join(cache, "src", s._commit));
      cpSync(build(front), built, { recursive: true });
      rmSync(join(cache, "src", s._commit), { recursive: true, force: true });
    }
    const out = args.includes("--out")
      ? flag("--out")
      : join(root, "composition", s.image);
    const r = await capture({
      dir: built,
      out,
      route: flag("--route", cfg.route),
      mock: cfg.mock,
      storage: cfg.storage,
      before: cfg.before,
      viewport: cfg.viewport,
    });
    if (args.includes("--seen"))
      console.log("  API :\n    " + r.seen.join("\n    "));
    console.log(`  ✓ ${args.includes("--out") ? out : s.image}`);
  } catch (e) {
    console.error("  ✗", e.message.split("\n").slice(0, 6).join("\n    "));
    failed++;
  }
}
process.exit(failed ? 1 : 0);
