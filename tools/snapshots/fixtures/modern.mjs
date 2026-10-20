// Données simulées pour l'interface récente (Vite, API /v1). Entièrement fictives : aucun apprenant réel.
const SUBJECTS = ["accomplishment", "activity", "bonusSkill", "calendar", "chatbot", "course", "cursus", "dashboard", "dashboardIa", "evaluation", "feedback", "formation", "group", "hobbie", "lesson", "mediatheque", "module", "objective", "parcours", "permission", "profile", "quiz", "resource", "role", "skill", "social-network", "stats", "tag", "user"];

export const adminUser = {
  _id: "u1",
  firstname: "Camille",
  lastname: "Durand",
  email: "camille.durand@exemple.fr",
  roles: [{ _id: "r1", role: "admin", label: "Administrateur", rank: 1, protection: 1 }],
  abilityRules: [{ action: ["read", "write", "update", "delete"], subject: SUBJECTS }],
  onboarding: { status: "completed", step: "" },
  themeMode: "light",
};

const parcours = [
  { id: 1, title: "Développeur web 2026", level: "Bac +2", canManage: true, parcours: [
    { id: 11, title: "Développeur web - Parcours 2026", startDate: "2026-01-12", endDate: "2026-12-18", isPublished: true, thumb: null, canManage: true },
    { id: 12, title: "Accessibilité du web", startDate: "2026-03-02", endDate: "2026-06-26", isPublished: true, thumb: null, canManage: true },
  ] },
  { id: 2, title: "Designer numérique", level: "Bac +3", canManage: true, parcours: [
    { id: 21, title: "Initiation - Parcours numérique", startDate: "2026-02-02", endDate: "2026-07-10", isPublished: false, thumb: null, canManage: true },
  ] },
];
const modules = [
  { id: 1, parcoursId: 11, title: "Construire une interface", thumb: null, parcours: "Développeur web - Parcours 2026", formation: "Développeur web 2026", coursesCount: 6, createdAt: "2026-09-14T09:00:00Z" },
  { id: 2, parcoursId: 11, title: "Accessibilité", thumb: null, parcours: "Développeur web - Parcours 2026", formation: "Développeur web 2026", coursesCount: 4, createdAt: "2026-09-02T09:00:00Z" },
  { id: 3, parcoursId: 21, title: "Les bases du design", thumb: null, parcours: "Initiation - Parcours numérique", formation: "Designer numérique", coursesCount: 5, createdAt: "2026-08-20T09:00:00Z" },
];

/** Construit le routeur de simulation ; `over(path, method)` peut répondre avant les valeurs par défaut. */
export function modern(over = () => undefined, user = adminUser) {
  return (path, method, url) => {
    const o = over(path, method, url);
    if (o !== undefined) return o;
    if (path.endsWith("/auth/setup-status")) return { hasAdmins: true, activationTokenTtlMinutes: 60 };
    if (path.endsWith("/auth/handshake")) return user;
    if (path.endsWith("/demo/config")) return { demoMode: false, demoUrl: "", exitUrl: "", aiDisabled: false };
    if (path.endsWith("/instance-settings")) return { name: "Step", enabledThemes: ["classic", "ocean"], theme: "ocean" };
    if (path.endsWith("/auth/roles")) return user.roles;
    if (path.endsWith("/parcours/root-parcours")) return parcours;
    if (path.endsWith("/modules")) return { response: modules };
    if (path.includes("/user/list/")) return { total: 12, response: [] };
    if (path.endsWith("/group/student")) return { data: [{ _id: "g1" }, { _id: "g2" }] };
    if (path.endsWith("/formation/list")) return { response: parcours.map((p) => ({ id: p.id, title: p.title, code: "F" + p.id, level: p.level, parcours: p.parcours.length, createdAt: "2026-01-05T09:00:00Z" })) };
    if (path.endsWith("/course/best-rated")) return { globalQualityRating: 4.6, coursesRating: [{ firstLessonId: 1, moduleId: 1, courseTitle: "Les bases du HTML", rating: 4.8 }, { firstLessonId: 2, moduleId: 1, courseTitle: "Concevoir une page accessible", rating: 4.6 }] };
    if (path.includes("/user/last-feedbacks")) return { success: true, response: [] };
    if (path.includes("/staff-onboarding")) return { status: "completed" };
    if (path.includes("/chatbot/dialogs")) return [];
    return [];
  };
}

export const studentUser = {
  ...adminUser,
  _id: "u2",
  firstname: "Léa",
  lastname: "Moreau",
  email: "lea.moreau@exemple.fr",
  roles: [{ _id: "r3", role: "student", label: "Apprenant", rank: 3, protection: 1 }],
};

/** Données des pages de gestion de l'interface actuelle (médiathèque, tags). Fictives. */
const MEDIA = [
  ["logo-organisme.png", "image", 124000, 4], ["banniere-parcours.jpg", "image", 860000, 2], ["schema-html.svg", "image", 18000, 6],
  ["photo-equipe.webp", "image", 312000, 0], ["capture-editeur.png", "image", 540000, 3], ["intro-html.mp4", "video", 47100000, 1],
];
export function modernPages(path) {
  if (path === "/media") {
    return {
      medias: MEDIA.map(([name, type, size, used], i) => ({ id: i + 1, url: `/uploads/${type}s/media-${i + 1}.png`, name, type, size, used, createdAt: new Date(Date.UTC(2026, 8, 20 - i)).toISOString(), associatedActivities: [] })),
      total: MEDIA.length,
      totalPages: 1,
    };
  }
  const tags = [["web", "#0369a1", 5, ["Développeur web 2026"]], ["accessibilité", "#059669", 3, ["Accessibilité du web"]], ["design", "#a16207", 2, ["Designer numérique"]], ["javascript", "#7c3aed", 4, ["Développeur web 2026"]]].map(([name, color, totalUses, ps], i) => ({ id: i + 1, name, color, canDelete: true, canUpdate: true, totalUses, parcours: ps.map((title, k) => ({ id: k + 1, title })) }));
  if (path === "/tag") return tags;
  if (path.startsWith("/tag/paginate")) return { list: tags, total: tags.length };
  return undefined;
}
