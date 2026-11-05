// Captures de la page de connexion, pour le comparatif « début / fin » de la clôture (content/scenes/closing.json → comparatif).
//
//   node tools/snapshots/login.mjs            # début + les quatre fonds Unsplash de la version actuelle
//   node tools/snapshots/login.mjs debut      # seulement la capture de 2023
//   node tools/snapshots/login.mjs fin        # seulement les quatre captures de 2026
//
// Début : commit 8204569ef (28 juin 2023), image statique de la maquette. Fin : commit 57087787e (15 octobre 2026),
// fond tiré de l'API Unsplash. Les quatre photos (composition/assets/connexion/unsplash-*.webp) sont de vraies photos
// Unsplash (licence Unsplash), servies depuis le disque : la capture ne dépend ni du réseau ni d'une clé d'API.
import { mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { exportFront, build, capture } from "./lib.mjs";
import { modern } from "./fixtures/modern.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const repo = resolve(root, "../lxp");
const cache = join(root, ".snapshots-cache");
const assets = join(root, "composition/assets/connexion");
const which = process.argv[2] || "all";

// Photographes des quatre fonds (crédits repris sur la diapositive).
const PHOTOS = [
  {
    id: "1712105052313-ae83f9c8cf7e",
    alt: "Façade blanche, architecture minimale",
    author: {
      name: "Lance Anderson",
      profileUrl: "https://unsplash.com/@lanceanderson",
    },
  },
  {
    id: "1760926521199-9b2194e9d266",
    alt: "Architecture abstraite en noir et blanc",
    author: {
      name: "Sebastian Schuster",
      profileUrl: "https://unsplash.com/@sschusterphotoart",
    },
  },
  {
    id: "1767854507594-424e6a844672",
    alt: "Béton brutaliste et escaliers",
    author: { name: "I P", profileUrl: "https://unsplash.com/@ipraudz" },
  },
  {
    id: "1761414500810-6317b6b32801",
    alt: "Relief de béton géométrique",
    author: {
      name: "Gérard Griffay",
      profileUrl: "https://unsplash.com/@ggriffay",
    },
  },
];

const built = async (hash) => {
  const out = join(cache, "out", hash);
  if (!existsSync(out)) {
    const front = exportFront(repo, hash, join(cache, "src", hash));
    mkdirSync(join(cache, "out"), { recursive: true });
    cpSync(build(front), out, { recursive: true });
    rmSync(join(cache, "src", hash), { recursive: true, force: true });
  }
  return out;
};

// Visiteur non connecté : le handshake est refusé, l'application affiche la connexion.
const anonymous = (extra) => (path, method, url) => {
  if (path.endsWith("/auth/handshake"))
    return { __status: 401, __body: { message: "Non connecté" } };
  return extra?.(path, method, url);
};

mkdirSync(assets, { recursive: true });
let failed = 0;
const run = async (label, job) => {
  console.log(label);
  try {
    await job();
  } catch (e) {
    console.error("  ✗", e.message.split("\n").slice(0, 6).join("\n    "));
    failed++;
  }
};

if (which === "all" || which === "debut") {
  await run("[début] 28 juin 2023 - connexion (8204569ef)", async () => {
    const dir = await built("8204569ef");
    await capture({
      dir,
      route: "/",
      mock: anonymous(() => ({})),
      out: join(assets, "debut.webp"),
      wait: 1500,
    });
  });
}

if (which === "all" || which === "fin") {
  const dir = await built("57087787e");
  const files = Object.fromEntries(
    PHOTOS.map((p, i) => [
      `photo-${p.id}`,
      join(assets, `unsplash-${i + 1}.webp`),
    ]),
  );
  for (const [i, photo] of PHOTOS.entries()) {
    await run(
      `[fin ${i + 1}] 15 octobre 2026 - connexion, fond de ${photo.author.name} (57087787e)`,
      async () => {
        const mock = modern((path) => {
          if (path.endsWith("/auth/handshake"))
            return { __status: 401, __body: { message: "Non connecté" } };
          if (path.endsWith("/auth/backgrounds"))
            return {
              photos: [
                {
                  ...photo,
                  url: `https://images.unsplash.com/photo-${photo.id}?w=1400`,
                },
              ],
            };
          return undefined;
        });
        await capture({
          dir,
          route: "/",
          mock,
          files,
          out: join(assets, `fin-${i + 1}.webp`),
          wait: 4500,
        });
      },
    );
  }
}
process.exit(failed ? 1 : 0);
