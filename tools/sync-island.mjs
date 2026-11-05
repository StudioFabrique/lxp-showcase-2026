// Copie l'île JSON du slideshow de composition/index.html vers index.html (wrapper), et génère les données de
// la navigation globale (ui/nav.js) : ordre de présentation des scènes, libellés et textes de l'interface.
// <hyperframes-slideshow> lit l'île dans son propre innerHTML, pas dans la composition.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const re = /<script type="application\/hyperframes-slideshow\+json"[^>]*>([\s\S]*?)<\/script>/;

const src = readFileSync(join(root, "composition/index.html"), "utf8").match(re);
if (!src) throw new Error("Île introuvable dans composition/index.html");
const island = JSON.parse(src[1]); // valide le JSON au passage
const json = JSON.stringify(island);

// Navigation : ordre de présentation = diapositives de premier niveau, puis les huit scènes détaillées, puis la clôture.
const scene = (id) => {
  const p = join(root, "content/scenes", id + ".json");
  return existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : {};
};
const deck = JSON.parse(readFileSync(join(root, "content/deck.json"), "utf8"));
const label = (id) => scene(id).label || id;
const main = island.slides.map((s, index) => ({ kind: "main", id: s.sceneId, index, label: label(s.sceneId) }));
const closing = main.filter((e) => e.id === "closing");
const entries = [
  ...main.filter((e) => e.id !== "closing"),
  ...island.slideSequences.map((q) => ({ kind: "seq", id: q.id, label: q.label || label(q.id) })),
  ...closing,
];
const nav = JSON.stringify({ ui: deck.ui?.nav ?? { title: "Plan", open: "Plan", close: "Fermer" }, entries });

const wrapperPath = join(root, "index.html");
const wrapper = readFileSync(wrapperPath, "utf8");
const marker = /(<script\s+type="application\/hyperframes-slideshow\+json"\s+id="island-copy"\s*>)[\s\S]*?(<\/script>)/;
if (!marker.test(wrapper)) throw new Error("Marqueur island-copy introuvable dans index.html");
const navMarker = /(<script\s+type="application\/json"\s+id="nav-data"\s*>)[\s\S]*?(<\/script>)/;
if (!navMarker.test(wrapper)) throw new Error("Marqueur nav-data introuvable dans index.html");
const next = wrapper.replace(marker, `$1${json}$2`).replace(navMarker, `$1${nav.replace(/<\//g, "<\\/")}$2`);
// N'écrit que si le contenu change : évite de relancer les observateurs de fichiers (rechargement en boucle).
if (next !== wrapper) writeFileSync(wrapperPath, next);
console.log("Île synchronisée (" + json.length + " octets), navigation : " + entries.length + " entrées");
