// Export autonome : dist/ zippé dans lxp-showcase-2026.zip (un dossier lxp-showcase-2026/ avec un LISEZMOI.txt).
//
//   npm run zip      # construit dist/ puis crée le zip à la racine du projet (ignoré par git)
//
// Le zip s'ouvre n'importe où : décompresser, double-cliquer sur index.html (aucun serveur, aucun réseau).
// Nécessite l'outil `zip` du système (macOS, Linux, Windows 10+ avec zip installé).
import {
  cpSync,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
  statSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
if (!existsSync(join(dist, "index.html")))
  throw new Error("dist/ absent : lancez `npm run build` (ou `npm run zip`).");

const name = "lxp-showcase-2026";
const staging = join(root, ".zip-staging");
const folder = join(staging, name);
const out = join(root, name + ".zip");
rmSync(staging, { recursive: true, force: true });
mkdirSync(staging, { recursive: true });
cpSync(dist, folder, { recursive: true });
writeFileSync(
  join(folder, "LISEZMOI.txt"),
  `Présentation ANDRIA 2026

Ouvrir index.html dans un navigateur récent (Chrome, Edge, Safari, Firefox). Aucune connexion nécessaire.
Mettre en plein écran avec le bouton en bas à droite (ou F11).

Navigation
  → ou Espace ou clic sur le chevron   étape suivante
  ←                                    étape précédente
  G (ou le numéro en bas à gauche)     plan de la présentation : saut direct vers n'importe quelle scène
  P                                    mode présentateur (notes, étape suivante, chronomètre)
`,
);
rmSync(out, { force: true });
const r = spawnSync("zip", ["-r", "-q", out, name], {
  cwd: staging,
  stdio: "inherit",
});
rmSync(staging, { recursive: true, force: true });
if (r.status !== 0)
  throw new Error("Échec de la commande `zip` (est-elle installée ?).");
console.log(
  `${name}.zip : ${(statSync(out).size / 1024 / 1024).toFixed(1)} Mo`,
);
