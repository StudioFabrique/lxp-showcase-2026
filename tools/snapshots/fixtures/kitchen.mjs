// Objets « tout-terrain » : tous les champs usuels des entités du LXP sont renseignés, pour que les vues de liste
// des anciennes versions s'affichent sans avoir à relire chaque type. Données fictives.
export const PARCOURS = ["Développeur web 2026", "Initiation au numérique", "Accessibilité du web", "Design d'interface"];
export const MODULES = ["Construire une interface", "Les balises principales", "Mise en page", "Accessibilité", "Publier son site"];
export const COURSES = ["Les bases du HTML", "Concevoir une page accessible", "Mettre en page avec CSS", "Les formulaires", "Publier son site"];
export const PEOPLE = [["Camille", "Durand"], ["Louis", "Martin"], ["Inès", "Bernard"], ["Hugo", "Petit"], ["Léa", "Moreau"]];

const day = (n) => new Date(Date.UTC(2025, 0, 6 + n * 14)).toISOString();

export const formation = { id: 1, title: "Développeur web", level: "Bac +2", code: "DW", description: "Formation de développeur web.", parcours: 4, createdAt: day(0) };

export const parcours = (i = 0) => ({
  id: i + 1,
  title: PARCOURS[i % PARCOURS.length],
  description: "Un parcours pour apprendre à concevoir et publier des pages web accessibles.",
  image: null,
  thumb: null,
  startDate: day(i),
  endDate: day(i + 20),
  createdAt: day(i),
  updatedAt: day(i + 1),
  adminId: 1,
  formation,
  tags: [{ id: 1, name: "web", title: "web", color: "#0369a1" }, { id: 2, name: "accessibilité", title: "accessibilité", color: "#059669" }],
  contacts: [{ id: 1, firstname: "Marc", lastname: "Lefèvre", email: "marc.lefevre@exemple.fr", role: "teacher" }],
  skills: [], bonusSkills: [], objectives: [{ id: 1, title: "Structurer une page" }],
  modules: MODULES.slice(0, 3).map((t, k) => module_(k)),
  groups: [{ id: 1, name: "Promotion A", students: 18 }],
  virtualClass: "",
  isPublished: i % 4 !== 3,
  visibility: i % 4 !== 3,
  author: "Camille Durand",
  progress: 40 + i * 10,
  nbStudents: 18 - i,
  hours: 140 + i * 20,
  duration: 140 + i * 20,
  certificate: "Oui",
});

export function module_(i = 0) {
  return {
    id: i + 1, title: MODULES[i % MODULES.length], description: "Un module regroupe des cours.", image: null, thumb: null,
    startDate: day(i), endDate: day(i + 4), parcoursId: 1, parcours: PARCOURS[0], formation: formation.title,
    courses: COURSES.slice(0, 3).map((t, k) => course(k)), coursesCount: 3, nbCourses: 3, createdAt: day(i), updatedAt: day(i), isPublished: true, order: i + 1, hours: 20, color: "#0369a1",
  };
}

export const course = (i = 0) => ({
  id: i + 1, title: COURSES[i % COURSES.length], description: "Un cours regroupe des leçons.", image: null, thumb: null, moduleId: 1, module: MODULES[0], parcours: PARCOURS[0],
  lessons: [{ id: 1, title: "La structure d'une page" }, { id: 2, title: "Les titres et les listes" }], nbLessons: 2, createdAt: day(i), updatedAt: day(i), isPublished: true, rating: 4.8 - i * 0.2, views: 120 - i * 14, order: i + 1,
});

export const user = (i = 0, role = "student") => ({
  id: i + 1, _id: "u" + i, idMdb: "u" + i, firstname: PEOPLE[i % PEOPLE.length][0], lastname: PEOPLE[i % PEOPLE.length][1], email: `${PEOPLE[i % PEOPLE.length][0].toLowerCase().replace("è", "e")}@exemple.fr`.replace("é", "e"),
  role, roles: [{ role, label: role === "student" ? "Apprenant" : "Équipe pédagogique", rank: role === "student" ? 3 : 2 }], isActive: true, status: "active", image: null, avatar: null,
  groups: [{ id: 1, name: "Promotion A" }], parcours: [PARCOURS[0]], createdAt: day(i), lastLogin: day(i + 10),
});

export const group = (i = 0) => ({ id: i + 1, _id: "g" + i, index: i + 1, desc: ["Promotion de septembre", "Promotion de janvier", "Cours du soir"][i % 3], formation: "Développeur web", isActive: i !== 2, isSelected: false, roles: [{ role: "student", label: "Apprenant" }], startDate: day(i), endDate: day(i + 20), tags: [], name: ["Promotion A", "Promotion B", "Atelier du soir"][i % 3], students: 18 - i * 3, nbStudents: 18 - i * 3, parcours: PARCOURS[i % PARCOURS.length], parcoursId: i + 1, createdAt: day(i), users: [user(0), user(1)] });
export const tag = (i = 0) => ({ id: i + 1, name: ["web", "accessibilité", "design", "javascript"][i % 4], title: ["web", "accessibilité", "design", "javascript"][i % 4], color: ["#0369a1", "#059669", "#a16207", "#7c3aed"][i % 4], nbUsed: 4 - i, createdAt: day(i) });
export const list = (fn, n = 4) => Array.from({ length: n }, (_, i) => fn(i));

/** Réponse par défaut d'une route de lecture, devinée d'après son nom ; `wrap` adapte l'enveloppe de l'époque. */
const RESSOURCES = ["user", "group", "parcours", "formation", "course", "module", "lesson", "tag", "role", "mediatheque", "feedback", "evaluation", "objective", "skill", "stats", "dashboard", "calendar", "chatbot", "quiz", "resource"];
export const media = (i = 0, type = "image") => ({ id: i + 1, url: `/uploads/${type}s/media-${i + 1}.png`, originalName: ["logo-organisme.png", "banniere-parcours.jpg", "schema-html.svg", "photo-equipe.webp", "capture-editeur.png", "intro-html.mp4"][i % 6], type, size: 120000 + i * 90000, used: i % 4 });

export function guess(path, wrap = (a) => a) {
  const p = path.toLowerCase();
  // Listes paginées (…/lastname/asc) : { list, total }.
  if (/\/(lastname|title|name)\/(asc|desc)/.test(p)) {
    const inner = guess(p.replace(/\/(lastname|title|name)\/(asc|desc).*/, ""));
    if (Array.isArray(inner)) return { list: inner, total: inner.length };
  }
  if (/parcours-by-id|\/parcours\/\d+$/.test(p)) return { ...parcours(0), tags: parcours(0).tags.map((tag) => ({ tag })), contacts: [{ contact: { ...user(0, "teacher"), firstname: "Marc", lastname: "Lefèvre" } }], formation: { ...formation, tags: [] } };
  if (/profile\/information/.test(p)) return { message: "ok", data: { firstname: "Camille", lastname: "Durand", nickname: "Cam", email: "camille.durand@exemple.fr", address: "12 rue des Écoles", city: "Poitiers", postCode: "86000", phoneNumber: "05 49 00 00 00", description: "Formatrice en développement web.", hobbies: ["lecture", "randonnée"] } };
  if (/^\/permission/.test(p)) return { data: ["read", "create", "update", "delete", "write"].map((action) => ({ action, ressources: RESSOURCES })) };
  if (/^\/media/.test(p)) return { medias: list((i) => media(i), 6), totalPages: 2 };
  if (/formation/.test(p)) return wrap([formation, { ...formation, id: 2, title: "Designer numérique", code: "DN" }]);
  if (/parcours/.test(p)) return wrap(list(parcours, 4));
  if (/module/.test(p)) return wrap(list(module_, 5));
  if (/course|cours/.test(p)) return wrap(list(course, 5));
  if (/lesson|lecon/.test(p)) return wrap(list(course, 4));
  if (/group/.test(p)) return wrap(list(group, 3));
  if (/tag/.test(p)) return wrap(list(tag, 4));
  if (/user|student|teacher|contacts/.test(p)) return wrap(list((i) => user(i), 5));
  return undefined;
}

/** Remplit des champs de formulaire (vraie saisie, pour une capture « vivante »). */
export async function fill(page, pairs) {
  for (const [sel, text] of pairs) {
    await page.waitForSelector(sel, { timeout: 5000 }).catch(() => {});
    await page.type(sel, text, { delay: 5 }).catch(() => {});
  }
}

/** Navigation côté client (les anciennes versions redirigent toute entrée directe vers l'accueil après connexion). */
export async function go(page, path, wait = 1500) {
  await page.evaluate((p) => {
    window.history.pushState({}, "", p);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, path);
  await new Promise((r) => setTimeout(r, wait));
}

/** Cours planifiés autour de la date du jour (la vue calendrier affiche la semaine courante). */
export function timeline() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // lundi de la semaine
  const at = (days, h, m = 0) => new Date(d.getTime() + days * 86400000 + (h * 60 + m) * 60000).toISOString();
  const rows = [
    ["Construire une interface", "Les bases du HTML", 0, 9, 11],
    ["Construire une interface", "Les balises principales", 1, 14, 16],
    ["Accessibilité", "Concevoir une page accessible", 2, 9, 12],
    ["Mise en page", "Mettre en page avec CSS", 3, 13, 16],
    ["Mise en page", "Les formulaires", 4, 9, 11, 30],
  ];
  return { data: rows.map(([moduleTitle, title, day, h1, h2, m2], i) => ({ id: i + 1, alternateId: i + 1, moduleId: i + 1, firstLessonId: i + 1, moduleTitle, title, minDate: at(day, h1), maxDate: at(day, h2, m2 || 0) })) };
}

/** Tableau de bord de consommation IA (mêmes chiffres fictifs que la scène « Piloter »). */
export function dashboardIA(path) {
  if (path.endsWith("/dashboard-ia/total-tokens")) return { totalTokens: 412300, totalCurrentMonthTokens: 128400 };
  if (path.endsWith("/dashboard-ia/groups-all-stats")) {
    return [
      { _id: "g1", groupName: "Développeur web 2026", totalTokens: 76800, totalPrompts: 640, averageTokensPerPrompt: 120 },
      { _id: "g2", groupName: "Designer numérique 2026", totalTokens: 51600, totalPrompts: 480, averageTokensPerPrompt: 107 },
    ];
  }
  if (path.includes("/dashboard-ia/top-users")) {
    const rows = [["Camille", 18400], ["Louis", 15200], ["Inès", 12900], ["Hugo", 11300], ["Léa", 9800]];
    return { list: rows.map(([name, totalTokens], i) => ({ _id: "u" + i, name, totalTokens, groupName: i % 2 ? "Designer numérique 2026" : "Développeur web 2026", lastActivity: new Date(Date.UTC(2026, 2, 5 - i)).toISOString(), role: "student" })), total: 5 };
  }
  return undefined;
}
