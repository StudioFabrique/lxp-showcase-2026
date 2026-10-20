// Miniatures du plan de la présentation (ui/nav.js) : une capture par scène, composition/assets/thumbs/<id>.webp.
//
//   npm run thumbs            # toutes les scènes
//   npm run thumbs -- care    # une scène
//
// Chaque scène est ouverte comme avec son raccourci (index.html#<id>), laissée se poser, puis capturée sans le
// contrôleur ni le numéro de diapositive. Prérequis : `npm install` (puppeteer-core) et Google Chrome.
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import puppeteer from "puppeteer-core";
import { serve, CHROME } from "./snapshots/lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "composition/assets/thumbs");
mkdirSync(out, { recursive: true });

const nav = JSON.parse(readFileSync(join(root, "index.html"), "utf8").match(/id="nav-data">([\s\S]*?)<\/script>/)[1].replace(/<\\\//g, "</"));
const only = process.argv[2];
const entries = nav.entries.filter((e) => !only || e.id === only);
// Scènes dont l'animation d'entrée est longue : le logo ANDRIA se compose en plusieurs secondes.
const SETTLE = { intro: 9000, what: 6500, frise: 9000, closing: 5500 };

const server = await serve(root);
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
try {
  for (const en of entries) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 0.3 });
    await page.goto(`http://127.0.0.1:${server.port}/index.html`, { waitUntil: "load" });
    await page.addStyleTag({ content: "[data-hf-chrome], #nav { display: none !important; }" });
    // Même saut que le plan (ui/nav.js) : la scène s'ouvre à son état initial.
    await page.waitForFunction(() => document.querySelector("hyperframes-slideshow").controller?.show, { timeout: 20000 });
    await page.evaluate((en) => {
      const c = document.querySelector("hyperframes-slideshow").controller;
      if (en.kind === "main") c.syncTo("main", en.index, 0);
      else c.syncTo(en.id, 0, 0);
    }, en);
    await new Promise((r) => setTimeout(r, SETTLE[en.id] ?? 4500));
    const file = join(out, en.id + ".webp");
    await page.screenshot({ path: file, type: "webp", quality: 72 });
    console.log("✓", en.id);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
