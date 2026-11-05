// Écran à capturer pour chaque jalon de content/scenes/closing.json (même ordre que `snapshots[]`).
// `route` : écran ; `mock` : réponses simulées de l'époque ; `before` : actions avant la capture (navigation, clic, saisie).
// Les anciennes versions redirigent toute entrée directe vers l'accueil : on y arrive puis on navigue (`go`).
import { modern, modernPages, studentUser } from "./fixtures/modern.mjs";
import {
  parcours,
  list,
  guess,
  fill,
  go,
  timeline,
  dashboardIA,
} from "./fixtures/kitchen.mjs";

const anyList = (path) => guess(path);
// Pages de gestion de l'interface actuelle : données des pages, puis navigation côté client depuis l'accueil.
const pageData = (p) =>
  modernPages(p) ??
  (/^\/(user\/list\/everything|user\/stats|course|lesson|group)/.test(p)
    ? guess(p)
    : undefined);
const page = (target) => ({
  route: "/admin",
  mock: modern(pageData),
  before: (p) => go(p, target),
});
const admin = (target) => ({
  route: "/admin",
  mock: modern(anyList),
  before: (p) => go(p, target),
});

export const captures = {
  // 28 juin 2023 - premiers écrans : formulaire de création d'un parcours
  0: {
    route: "/admin/parcours/créer-un-parcours",
    mock: modern(anyList),
    before: (p) =>
      fill(p, [
        ['input[type="text"]', "Développeur web 2026"],
        ["textarea", "Concevoir et publier des pages web accessibles."],
      ]),
  },
  // 4 septembre 2023 - édition d'un parcours (étapes)
  1: admin("/admin/parcours/edit/1"),
  // 29 décembre 2023 - profil de l'utilisateur
  2: admin("/admin/profil"),
  // 5 mars 2024 - tableau de bord avec navigation latérale
  3: { route: "/admin", mock: modern(anyList) },
  // 27 septembre 2024 - liste des groupes
  4: admin("/admin/group"),
  // 19 décembre 2024 - médiathèque
  5: admin("/admin/mediatheque"),
  // 24 avril 2025 - liste des parcours
  6: {
    route: "/admin/parcours",
    mock: modern((path) =>
      path === "/parcours" ? list(parcours, 4) : undefined,
    ),
  },
  // 8 septembre 2025 - assistant virtuel (premier chatbot)
  7: {
    route: "/admin",
    mock: modern(anyList),
    before: async (p) => {
      await p.mouse.click(1378, 838); // la bulle verte, en bas à droite
      await new Promise((r) => setTimeout(r, 1200));
      await fill(p, [["textarea", "Peux-tu m'expliquer la balise main ?"]]);
    },
  },
  // 2 décembre 2025 - calendrier de l'apprenant
  8: {
    route: "/student",
    mock: modern(
      (path) => (path === "/course/timeline" ? timeline() : anyList(path)),
      studentUser,
    ),
    before: (p) => go(p, "/student/calendrier"),
  },
  // 5 mars 2026 - tableau de bord de consommation IA
  9: {
    route: "/admin",
    mock: modern((path) => dashboardIA(path) ?? anyList(path)),
    before: (p) => go(p, "/admin/dashboard-ia"),
  },
  // 5 mars 2026 - l'ancien tableau de bord (boutons d'actions rapides, tableau des parcours)
  10: { route: "/admin", mock: modern(anyList) },
  // 15 octobre 2026 - le nouveau tableau de bord (nouveaux composants)
  11: { route: "/admin/dashboard", mock: modern() },
  // 15 octobre 2026 - autres pages de la nouvelle interface : parcours, médiathèque
  12: page("/admin/parcours"),
  13: page("/admin/mediatheque"),
  // 14 - comparatif de la page de connexion (2023 / 2026) : captures par tools/snapshots/login.mjs
};
