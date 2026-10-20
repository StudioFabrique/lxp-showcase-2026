// Assemble content/*.json en composition/js/content.js (window.CONTENT) et contrôle les clés.
//
//   content/deck.json            textes communs (titre, mention de cofinancement, boutons, URL de démo)
//   content/scenes/<id>.json     un fichier par scène : label, notes de présentateur, puis ses textes
//
// Le fichier généré est un script classique (pas de fetch) : il fonctionne en file:// et dans dist/.
// Les libellés et notes de présentateur sont aussi reportés dans l'île JSON du slideshow
// (composition/index.html), qui sert d'entrée au wrapper.
//
// Contrôles : JSON valide, clés utilisées par le HTML ou les scripts mais absentes du JSON (erreur),
// clés du JSON jamais utilisées (avertissement ; les clés commençant par « _ » sont ignorées).
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const write = (p, s) => {
  // N'écrit que si le contenu change : évite de relancer les observateurs de fichiers.
  if (!existsSync(join(root, p)) || read(p) !== s) writeFileSync(join(root, p), s);
};

const parse = (p) => {
  try {
    return JSON.parse(read(p));
  } catch (e) {
    throw new Error(`${p} : ${e.message}`);
  }
};

// 1. Assemblage
const content = { deck: parse("content/deck.json") };
for (const f of readdirSync(join(root, "content/scenes")).sort()) {
  if (f.endsWith(".json")) content[f.slice(0, -5)] = parse("content/scenes/" + f);
}
const banner =
  "/* GÉNÉRÉ par tools/sync-content.mjs depuis content/*.json : ne pas modifier ici. */\n";
write("composition/js/content.js", banner + "window.CONTENT = " + JSON.stringify(content, null, 2) + ";\n");

// 2. Île du slideshow : libellés et notes de présentateur
const islandRe = /(<script type="application\/hyperframes-slideshow\+json"[^>]*>)([\s\S]*?)(<\/script>)/;
let html = read("composition/index.html");
const island = JSON.parse(html.match(islandRe)[2]);
const apply = (slide) => {
  const c = content[slide.sceneId];
  if (!c) throw new Error(`Île : la scène « ${slide.sceneId} » n'a pas de content/scenes/${slide.sceneId}.json`);
  slide.notes = c.notes ?? "";
};
island.slides.forEach(apply);
island.slideSequences.forEach((seq) => {
  seq.slides.forEach(apply);
  const c = content[seq.id];
  if (!c) throw new Error(`Île : la séquence « ${seq.id} » n'a pas de fichier de contenu`);
  seq.label = c.label;
});
html = html.replace(islandRe, (_, a, __, b) => `${a}\n${JSON.stringify(island, null, 2)}\n    ${b}`);
write("composition/index.html", html);

// 3. Contrôle des clés
const leaves = new Map(); // chemin → valeur
const walk = (o, path) => {
  if (o !== null && typeof o === "object") {
    for (const [k, v] of Object.entries(o)) walk(v, path ? `${path}.${k}` : k);
  } else leaves.set(path, o);
};
walk(content, "");

const sources = [html, ...readdirSync(join(root, "composition/js")).filter((f) => f.endsWith(".js") && f !== "content.js" && f !== "bind.js" && f !== "logo.js").map((f) => read("composition/js/" + f))].join("\n");
const refs = new Set();
for (const m of sources.matchAll(/data-tx(?:-[a-z-]+)?="([^"]+)"/g)) m[1].split("|").forEach((k) => refs.add(k));
for (const m of sources.matchAll(/Content\.(?:get|text)\("([^"]+)"\)/g)) refs.add(m[1]);
// Clé construite dans une boucle : Content.get("a.b." + i) couvre tout ce qui est sous « a.b ».
for (const m of sources.matchAll(/Content\.(?:get|text)\("([^"]+?)\.?"\s*\+/g)) refs.add(m[1]);

// Clé écrite entre guillemets ailleurs (ex. dans un ternaire) : comptée si elle désigne un texte existant.
for (const m of sources.matchAll(/"([a-z]+\.[A-Za-z0-9_.-]+)"/g)) {
  if ([...leaves.keys()].some((k) => k === m[1] || k.startsWith(m[1] + "."))) refs.add(m[1]);
}

const errors = [];
const covered = new Set();
for (const r of refs) {
  const hits = [...leaves.keys()].filter((k) => k === r || k.startsWith(r + "."));
  if (!hits.length) errors.push(`clé utilisée mais absente du JSON : ${r}`);
  hits.forEach((k) => covered.add(k));
}
// Textes de la navigation globale (wrapper, ui/nav.js) : lus par sync-island, pas par la composition.
for (const k of leaves.keys()) if (k.startsWith("deck.ui.nav.")) covered.add(k);
// label et notes sont repris par l'île, pas par des data-t
for (const k of leaves.keys()) if (/^[\w]+\.(label|notes)$/.test(k) && k !== "deck.label") covered.add(k);
const unused = [...leaves.keys()].filter((k) => !covered.has(k) && leaves.get(k) !== null && leaves.get(k) !== "" && !k.split(".").some((p) => p.startsWith("_")));

if (unused.length) console.warn(`⚠ ${unused.length} texte(s) du JSON ne sont lus par aucune scène :\n  ` + unused.join("\n  "));
if (errors.length) {
  console.error("✗ " + errors.join("\n✗ "));
  process.exit(1);
}
console.log(`Contenu synchronisé (${Object.keys(content).length} fichiers, ${leaves.size} textes, ${refs.size} clés liées)`);
