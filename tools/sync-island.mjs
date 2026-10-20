// Copie l'île JSON du slideshow de composition/index.html vers index.html (wrapper).
// <hyperframes-slideshow> lit l'île dans son propre innerHTML, pas dans la composition.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const re = /<script type="application\/hyperframes-slideshow\+json"[^>]*>([\s\S]*?)<\/script>/;

const src = readFileSync(join(root, "composition/index.html"), "utf8").match(re);
if (!src) throw new Error("Île introuvable dans composition/index.html");
const json = JSON.stringify(JSON.parse(src[1])); // valide le JSON au passage

const wrapperPath = join(root, "index.html");
const wrapper = readFileSync(wrapperPath, "utf8");
const marker = /(<script type="application\/hyperframes-slideshow\+json" id="island-copy">)[\s\S]*?(<\/script>)/;
if (!marker.test(wrapper)) throw new Error("Marqueur island-copy introuvable dans index.html");
const next = wrapper.replace(marker, `$1${json}$2`);
// N'écrit que si le contenu change : évite de relancer les observateurs de fichiers (rechargement en boucle).
if (next !== wrapper) writeFileSync(wrapperPath, next);
console.log("Île synchronisée (" + json.length + " octets)");
