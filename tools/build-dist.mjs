// Construit dist/ : un deck qui s'ouvre par double-clic (file://), sans serveur.
// Chrome traite chaque fichier file:// comme une origine distincte, ce qui empêche le player
// de piloter une <iframe src>. En injectant la composition via `srcdoc`, l'iframe partage
// l'origine du parent et le pilotage fonctionne.
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const read = (p) => readFileSync(join(root, p), "utf8");

// 1. Composition en un seul document : CSS et scripts locaux inlinés.
let comp = read("composition/index.html");
comp = comp.replace(/<link rel="stylesheet" href="([^"]+)" \/>/g, (_, href) => `<style>\n${read("composition/" + href)}\n</style>`);
comp = comp.replace(/<script src="([^"]+)"><\/script>/g, (_, src) => `<script>\n${read("composition/" + src).replace(/<\/script/gi, "<\\/script")}\n</script>`);
if (/<(script|link)[^>]+(src|href)="(?!data:)[^"]*"/.test(comp.replace(/<script type="application\/hyperframes[\s\S]*?<\/script>/, ""))) {
  console.warn("⚠ Une ressource de la composition n'a pas été inlinée.");
}
const srcdoc = comp.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

// 2. Wrapper : src= remplacé par srcdoc=.
let wrapper = read("index.html");
wrapper = wrapper.replace(/\s+src="composition\/index\.html"/, `\n        srcdoc="${srcdoc}"`);
// Miniatures du plan : dans dist/, les ressources de la composition sont à la racine de assets/.
wrapper = wrapper.replace('data-thumbs="composition/assets/thumbs/"', 'data-thumbs="assets/thumbs/"');

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
writeFileSync(join(dist, "index.html"), wrapper);
cpSync(join(root, "vendor"), join(dist, "vendor"), { recursive: true });
cpSync(join(root, "ui"), join(dist, "ui"), { recursive: true });
// Ressources référencées par la composition (images, logos) : chemins relatifs à dist/.
if (existsSync(join(root, "composition/assets"))) {
  cpSync(join(root, "composition/assets"), join(dist, "assets"), {
    recursive: true,
    filter: (p) => !/(gsap|MorphSVGPlugin)\.min\.js/.test(p),
  });
}
console.log("dist/index.html :", Math.round(wrapper.length / 1024), "Ko");
