# Showcase « LXP : état des lieux 2026 »

Présentation interactive (HTML / CSS / JS), fond blanc, exportable et lisible dans n'importe quel navigateur, y compris en ouvrant `index.html` en `file://`. Construite avec Claude Code, Hyperframes (GSAP, timelines pausées et déterministes) et les animations déjà produites dans `lxp/brag-output/`.

## 0. Constats sur l'existant

| Sujet              | Constat                                                                                                                                                                                                                         | Conséquence                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Skill `/brag`      | Absent de `~/.claude/skills`. Il reste son résultat : `lxp/brag-output/` (plan, composition Hyperframes de 201 s, 17 scènes, fixtures de vrais composants du LXP).                                                              | On réutilise ce workflow et ces sources, pas le skill.                                                              |
| Skill `/slideshow` | Cité par le routeur Hyperframes (deck interactif, fragments, hotspots, mode présentateur), mais non installé.                                                                                                                   | `npx hyperframes skills update slideshow`, puis redémarrer la session. Repli : un contrôleur maison de ~150 lignes. |
| Logo ANDRIA animé  | `front/src/features/auth/components/AuthAnimatedLogo.tsx`, SVG dans `front/public/andria-logo-*.svg`. Version Hyperframes : `front/public/presentations/andria/{brand.html,brand-timeline.js}`, révélation par masque de cases. | Copié tel quel dans le repo showcase, recoloré pour fond blanc.                                                     |
| Moteur d'animation | `motion.js` (GSAP + MorphSVG), `style.css`, `assets/*-fragments.json` (composants pré-rendus), `gsap.min.js` local.                                                                                                             | Les scènes interactives sont extraites sous forme de segments de timeline réutilisables.                            |
| Historique git     | 4 929 commits, du 17/04/2023 au 15/10/2026. Trous : avr.–juin 2024, juin 2025, avr. 2026 (1 commit). Pic en sept. 2026 (327).                                                                                                   | La phase 1 (juin 2022 – avril 2023) précède le dépôt : elle est montrée par les documents, pas par des commits.     |
| Mode démo          | `lxp/docs/mode-demo.md`                                                                                                                                                                                                         | Sert à capturer l'interface sans backend réel.                                                                      |

## 1. Décisions d'architecture

- **Zéro dépendance de build** pour le livrable : `index.html`, `css/`, `js/`, `assets/`. Scripts classiques (pas de modules ES, pas de `fetch`) afin que `file://` fonctionne. Les données (frise, commits) sont inlinées dans `js/data.js`.
- **Une timeline GSAP pausée par scène**, plus un petit moteur d'état qui les enchaîne. Chaque PAUSE du script est un `gate` : la timeline s'arrête sur un label, un seul déclencheur la relance (chevron, clic sur la frise, tuile, touche → / espace).
- **Navigation** : suivant (chevron, → , espace, clic), précédent (←, avec rembobinage `tl.reverse()` / `seek`), `Échap` = plan général de la frise, touche `P` = notes de présentateur. Pas de défilement, pas de dépendance à la molette.
- **Déterminisme** : pas de `Math.random()`, pas de `Date.now()`, pour que le retour arrière, le « Rewind » et les captures restent exacts.
- **Accessibilité** : `prefers-reduced-motion` (fondus à la place des mouvements), focus visible sur chevron, tuiles et jalons, `aria-live` pour le titre de scène.
- **Responsive** : cible 16:9 (1920×1080) mise à l'échelle par transform (`fit-to-viewport`), avec un repli lisible à partir de 1024 px de large.
- **Fond blanc** : tokens CSS `--bg:#fff`, thème Océan du LXP pour les accents. Le logo passe en `--color-primary` sur fond blanc.

## 2. Structure du dépôt

```
lxp-showcase-2026/
├─ index.html          wrapper de dev (<hyperframes-slideshow> + player, île JSON copiée)
├─ composition/        projet Hyperframes : index.html (scènes + île source), css/, js/deck.js, assets/ (GSAP, MorphSVG)
├─ vendor/             bundles hyperframes-player et hyperframes-slideshow (v0.8.174)
├─ dist/               export autonome (ouvrable en file://), généré par `npm run build`
├─ logos-partenaires/   (fournis : STEP, Région Nouvelle-Aquitaine, UE/FSE)
├─ assets/     logo/ - fragments/ - snapshots/
├─ tools/      sync-island.mjs - build-dist.mjs - (à venir : select-commits, capture-snapshots)
└─ PLAN.md - SCRIPT.md - README.md
```

## 3. Découpage en scènes (ordre de la présentation, indépendant de l'ordre du script de pitch)

### S0 Introduction

1. Logo ANDRIA animé (révélation par cases, puis logo continu).
2. Sous le logo : « STEP », « Région Nouvelle-Aquitaine », « Cofinancé par l'Union européenne ». Les logos officiels sont à fournir (fichiers vectoriels, en respectant la charte graphique FSE).
3. Grande plage de dates **2022 2026** (chiffres larges, en deux blocs séparables pour S3).
4. Chevron bas qui clignote. **PAUSE** → clic = transition.

### S1 Scène intermédiaire 1 (3 gates)

1. **Qu'est-ce que ANDRIA ?** : définition de la LXP, une phrase de contexte (transformation numérique des formations Step), la finalité (personnalisation + IA).
2. **PAUSE** → **Objectifs / problématique résolue** : les 3 problèmes de départ (individualisation impossible en LMS, besoin d'autonomie), puis les 9 objectifs regroupés en 3 familles (apprendre, s'engager, accompagner) pour rester lisible.
3. **PAUSE** → **LXP vs LMS** : tableau à 5 lignes, animé ligne par ligne (centré contenus ↔ centré utilisateur, etc.), phrase de conclusion « créer le contenant qui produit les données ».

### S2 Scène intermédiaire 2 : caractéristiques

- Le logo reste en haut, 9 tuiles interactives en dessous (une par caractéristique : Personnalisation, Reprise de l’apprentissage, Interactivité, Suivi, Intégration de contenu (Moodle), Analyse, Certification, Gestion de contenu, Assistant virtuel). Survol / clic = tuile qui s'agrandit avec un court texte et une icône Lucide. La tuile 2 du brief original était vide : la liste ci-dessus la remplit.
- Tuiles optionnelles, pas de gate obligatoire par tuile : le chevron suffit pour avancer.
- **Transition S2 → S3** : le logo et les logos partenaires disparaissent (animation existante inversée), puis « 2022 » et « 2026 » glissent chacun vers un côté, sans toucher les bords (marge de 4 vw).

### S3 Frise chronologique (scène principale, hub)

1. La frise apparaît entre les deux dates, « Projet LXP » au milieu. **PAUSE** : la frise est cliquable.
2. Le bout de la frise s'étend : **juin 2022 → novembre 2026**.
3. Jalons (proposition, à valider) :
   - Juin 2022 : lancement de la phase 1 (Région Nouvelle-Aquitaine)
   - 2022 – début 2023 : analyse concurrentielle, personas, entretiens
   - Avril 2023 : premier commit, architecture Node.js / Express, React, PostgreSQL + MongoDB, CI/CD
   - Février 2024 : fin de la phase 1, prototype fonctionnel
   - Juillet 2024 : début de la phase 2 (FSE), plateforme robuste + IA
   - 2025 : socle pédagogique, assistant virtuel, suivi et alertes
   - 2026 : consolidation, tableaux de bord, instance personnalisable
   - Novembre 2026 : fin du financement FSE
4. **Rewind** automatique jusqu'au premier jalon (le prototype). Chaque jalon ouvre ensuite une scène interactive, et la frise reste visible en bas comme fil d'Ariane (retour au hub par clic ou `Échap`).

### S4 Scènes interactives (8 scènes, ~45 s chacune)

Le brief en liste 9 puis 6 vides. Pour tenir 15 minutes, 8 scènes regroupent les séquences déjà animées dans `brag-output`.

| #   | Scène interactive                                                                | Source existante                                  | Jalon          |
| --- | -------------------------------------------------------------------------------- | ------------------------------------------------- | -------------- |
| 1   | Prototype et fondations : analyse concurrentielle, personas, architecture        | Nouvelle (schémas SVG)                            | 2022 – 02/2024 |
| 2   | Créer du contenu : hiérarchie pédagogique, éditeur, six types d'activité         | `hierarchy`, `editor`                             | 2024           |
| 3   | Assistant virtuel ANDRIA                                                         | `chatbot`                                         | 2025           |
| 4   | Évaluer : diagnostic, quiz, remises et corrections                               | `quiz`, `assignments`                             | 2025           |
| 5   | Organiser : calendrier, ressources, groupes, formateurs, tags                    | `calendar`, `groups`, `trainers`, `tags`          | 2025           |
| 6   | Suivre et accompagner : progression, humeur, décrochage                          | `progression`, `care`                             | 2025 – 2026    |
| 7   | Piloter : consommation IA, classement des cours, import Moodle, tableaux de bord | `usage`, `dashboards`                             | 2026           |
| 8   | Personnaliser et encourager : thèmes, instance, e-mails, félicitations           | `themes`, `instance`, `emails`, `accomplishments` | 2026           |

Chaque scène : un titre, 2 à 3 messages, une animation de 8 à 12 s rejouable, un bouton « Voir en démo » vers https://lxp.dev.step.eco. Données fictives uniquement, pas d'appel réseau.

### S5 Clôture : évolution de l'interface

1. Une bande de « snapshots » défile dans l'ordre chronologique, chacun avec sa date (format `jj/mm/aaaa`) et 1 à 3 fonctionnalités marquantes.
2. Navigation par chevron (un commit à la fois) ou lecture automatique, avec transition de fondu enchaîné entre deux captures.
3. En fin de parcours, la frise s'étend vers la droite avec une **flèche** pour signifier la suite du projet. Dernier plan : logo ANDRIA et lien démo.

## 4. Pipeline des snapshots de commits (S5)

1. `tools/select-commits.mjs` : à partir de `git log` du dépôt `lxp`, retient 10 à 14 commits : un par trimestre, de préférence des merges de PR `feat:` qui ajoutent une page ou un écran visible. Sortie : `commits.json` (hash, date, titre, fonctionnalités marquantes rédigées à la main puis relues).
2. `tools/capture-snapshots.mjs` : pour chaque commit, `git worktree add` dans le scratchpad, installation des dépendances, build Vite, lancement avec le mode démo ou des mocks API, capture Playwright (1440×900) de la page d'accueil et de l'écran phare, puis `git worktree remove`.
3. Repli : si un ancien commit ne se construit plus, on retient le premier commit voisin qui compile, et la date affichée reste celle du commit capturé.
4. Les captures sont optimisées en WebP, nommées `YYYY-MM-DD-<hash>.webp`, et référencées dans `data.js`.

**Risque principal et décision** : les anciens commits (2023) dépendent du backend et des bases. Décision : on ne cherche pas à reconstituer les bases. On capture les composants ou pages isolément, et si l'application bloque faute de données, on injecte de fausses données (mocks d'API au niveau de Playwright, `page.route`, ou fixtures locales). Aucune base réelle n'est lue. Chaque capture est vérifiée à l'œil avant d'être retenue.

## 5. Phasage des travaux avec Claude

| Phase   | Contenu                                                                                                       | Livrable vérifiable                                            |
| ------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| A ✅    | Cadrage : compléter les trous du brief (voir §7), `SCRIPT.md` (texte final par scène, en français, ton sobre) | Script validé                                                  |
| B ✅    | Socle : moteur d'état et gates, fond blanc, fit-to-viewport, navigation clavier, thème                        | Squelette navigable avec scènes vides                          |
| C ✅    | S0 + S1 : logo animé réutilisé, logos, dates, chevron, trois gates                                            | Captures aux jalons clés                                       |
| D       | S2 + transition + S3 : tuiles, séparation des années, frise, extension, rewind                                | Vidéo de la transition, test de retour arrière                 |
| E (1/8) | S4 : extraction des scènes brag en segments réutilisables (une scène à la fois, vérifiée)                     | 11 scènes jouables isolément                                   |
| F       | Pipeline de snapshots puis S5                                                                                 | Bande chronologique + flèche finale                            |
| G       | Finition : reduced-motion, responsive, performance, mode présentateur, export `dist/` zippé                   | `index.html` ouvert en `file://` sur Chrome, Safari et Firefox |
| H       | Dépôt GitHub `showcase/lxp-current-state-2026` (privé par défaut), README, premier push                       | URL du dépôt                                                   |

Chaque phase se termine par `npx hyperframes check` (lint, layout, contraste), une inspection visuelle (captures) et un commit. Les phases D et E sont les plus lourdes : prévoir des sous-agents en parallèle pour E (une scène par agent), avec un contrat commun (`export function build(tl, root)`).

## 6. Critères d'acceptation

- Ouverture hors ligne par double-clic sur `index.html`, sans erreur console.
- Chaque PAUSE du brief bloque réellement la lecture jusqu'à l'interaction ; retour arrière sans état corrompu.
- Aucune donnée réelle d'apprenant, aucun appel réseau, aucune clé.
- Textes conformes au script de pitch (dates, noms de financeurs, phases) ; les chiffres et dates de la frise sont relus par vous avant publication.
- Respect de la charte de communication FSE pour la mention « cofinancé par l'Union européenne » (emblème, taille et placement).

## 7. Décisions prises (19/10/2026)

| Sujet                     | Décision                                                                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Logos STEP / Région / UE  | Fournis dans `logos-partenaires/` (STEP PNG 3938×1683, Région JPG 620×261, UE+FSE PNG 400×250). Voir les réserves ci-dessous.          |
| Instance de démonstration | https://lxp.dev.step.eco                                                                                                               |
| Scènes interactives       | 8 (nombre retenu pour tenir la durée).                                                                                                 |
| GitHub                    | Pas de dépôt pour l'instant. Le dépôt local reste en `git init`. Le nom `showcase/lxp-current-state-2026` est conservé pour plus tard. |
| Durée                     | Environ 15 minutes, présentation guidée en direct.                                                                                     |
| Données manquantes        | Captures avec fausses données si la base bloque.                                                                                       |

Budget de temps : S0 1 min - S1 3 min - S2 1,5 min - S3 1,5 min - S4 6 min (8 × 45 s) - S5 2 min.

## 8. Reste à confirmer

- **Frise** : elle couvre 2022 → 2026 pour représenter le projet dans sa globalité. Les jalons détaillés restent à valider quand on arrive à S3.
- **Logos** : le logo UE/FSE ne fait que 400×250 px avec des marges blanches : il sera net jusqu'à ~200 px de large environ, pas plus. Idéalement une version vectorielle ou HD fournie par la DREETS/Région. Le JPG de la Région a un filet gris en bas à rogner et un fond blanc (compatible fond blanc). Aucun changement de proportions ni de couleurs.
- Langue : français uniquement (par défaut).

## 9. Enseignements de la phase B (socle)

- **Moteur** : `composition/js/deck.js`. Une scène = `.scene-frame` avec `data-fragments` (une PAUSE par fragment). Chaque scène a sa timeline GSAP locale avec des labels `step0…stepN` ; avancer = `tweenTo`, reculer = lecture inverse (rembobinage). Une scène peut fournir sa propre timeline via `Deck.scenes[id] = (tl, el) => {…}`.
- **Registre `__timelines`** : seule la timeline `root` est enregistrée. Le player pilote la première `data-composition-id` si elle est enregistrée, sinon la dernière clé ; d'où un conteneur `#root` autour des scènes.
- **file://** : une `<iframe src>` ne fonctionne pas en `file://` (Chrome isole chaque fichier) : le player ne peut plus piloter la composition. `npm run build` produit `dist/index.html` avec la composition injectée en `srcdoc` : testé en `file://`, navigation, clic sur le chevron et la frise, hotspot vers une branche et retour OK. En développement, `npm run dev` (serveur local `hyperframes present`).
- **Hotspots** : le contrôleur les affiche sur toute la scène, y compris avant l'extension de la frise (étape 0), avec des pastilles de la largeur du libellé. À traiter en phase D : libellés courts, et masquage visuel avant l'étape 1 (ou jalons dessinés par nous sous les pastilles).
- **`hyperframes check`** : passe (0 erreur). Un avertissement `composition_file_too_large` reste : acceptable, les scènes réelles seront découpées par fichier JS plutôt que par sous-composition.
- Le brouillon des scènes (S0 à S5, 8 branches) est un squelette : titres et blocs « à venir ».

## 10. Enseignements de la phase C (S0 + S1)

- **Calque persistant `#stage`** (`js/stage.js`) : logo ANDRIA (géométrie et masque de cases repris du LXP, `js/logo.js`), logos partenaires, mention de cofinancement, années. Poses `hero`, `dock`, `hidden` (à venir : `split` pour la frise). Chaque scène déclare ses poses de départ ET d'arrivée, donc le retour arrière est exact.
- **Transitions** : S0 → S1 fait passer l'identité du plan d'ouverture au bandeau (logo en haut à gauche, partenaires en haut à droite, années en bas à gauche) pendant que le contenu entre en profondeur (z, rotationX/Y, perspective 1600). Chaque étape quitte la précédente par un recul en profondeur.
- **Retour arrière** : le moteur rembobine la scène quittée (lecture inversée de sa timeline), puis affiche la précédente à l'état où on l'avait laissée.
- **Navigation « précédent »** : le contrôleur Hyperframes revient à la diapositive précédente, pas à la PAUSE précédente. Le wrapper corrige `controller.prev` (recul d'une PAUSE, puis atterrissage sur la dernière PAUSE de la diapositive d'avant). Dépend d'internes du bundle, d'où le bundle épinglé dans `vendor/`.
- **Pièges rencontrés** : un attribut `data-step` sur `<html>` masquait toute la page (règle CSS `[data-step]`) ; un `<div>` d'année sans `position:absolute` s'empilait au lieu de se positionner ; contraste du tiret des années (corrigé : `--secondary`).
- **Intro** : l'animation d'entrée se joue au chargement ; les seeks du player restent instantanés.
- **Reste pour S0/S1** : le logo se désassemble à la sortie de S2 (phase D), les logos sont à contrôler sur grand écran (le logo UE reste en 400 px de large).

## 11. Refonte 3D de S0 et S1 (retour du 19/10/2026)

Retour : pas assez de 3D, transitions peu agréables, trop de majuscules. Actions :

- **Règles de design du LXP** relues (`AGENTS.md`, `front/src/index.css`) : couleurs sémantiques DaisyUI uniquement, textes en français, composants existants. Le LXP n'emploie que `first-letter:uppercase` : plus aucune majuscule forcée. Les jetons de `css/base.css` reprennent les noms DaisyUI du thème Océan (`--color-primary`, `--color-base-200`…), avec un fond de page blanc.
- **Vocabulaire repris des séquences du dépôt `lxp/brag-output`** : pile de plaques inclinées qui se posent avec rebond et léger tour (niveaux de contenu, `js/fx.js` : `drop`, `explode`), sidebar de verre qui atterrit depuis l'avant, s'étend puis prend la couleur du thème, faces de tableau qui pivotent en entrant et en sortant, vue éclatée en profondeur.
- **S0** : logo qui arrive du fond en pivotant, partenaires sur des plaques qui se posent, années en relief dont l'extrusion s'aplatit en bandeau (`textShadow` interpolé, teintes lues dans le thème).
- **S1** : pile 3D « apprenant, besoins, envies, profil » ; sidebar de verre (Individualiser, Décrochage, Autonomie, Les objectifs) avec un tableau à quatre faces ; LMS (rangées à plat) contre LXP (plaques qui se détachent en profondeur).
- **Piège** : un `fromTo` à `immediateRender` activé écrase l'état initial posé par un `fromTo` précédent sur le même élément. `Deck.fx.ft` ne rend l'état de départ qu'au premier usage d'un élément dans une timeline.
- **Autre piège** : une timeline plus courte que son dernier label tronque `tweenTo` ; le moteur ajoute un repère de fin.

## 12. Retours du 19/10/2026 (suite)

- **Écran de départ** (`start`, première diapositive) : message « Appuyer sur n'importe quelle touche pour lancer la présentation » qui clignote en continu ; n'importe quelle touche (hors Ctrl/Cmd/Alt) ou un clic lance l'introduction. Toute la timeline est décalée de 4 s ; le sens avant/arrière d'une transition suit désormais l'ordre de l'île JSON et non les temps.
- **Clignotements** : le player fige les `@keyframes` CSS sur le temps de la timeline, donc un clignotement infini reste immobile. Les clignotements (message, chevrons) sont des tweens GSAP autonomes, de même que les survols (pas de `transition` CSS).
- **Aplatissement** : les années et les logos partenaires sont à plat (plus de relief ni de plaques), le logo ANDRIA n'a plus de clignotement (le logo continu apparaît sous le masque avant que celui-ci soit retiré).
- **Pyramide** : à la sortie, la pile s'ouvre en profondeur en tournant, puis chaque plaque la quitte à son tour du dessus vers la base, au lieu de s'aplatir d'un bloc.
- **Sidebar de S1** : une PAUSE par face (Individualiser, Décrochage, Autonomie, Les objectifs) au lieu de l'enchaînement automatique ; cliquer une entrée de la sidebar saute directement à sa face.
- **Chevrons** sans pastille. Survol : agrandissement avec rebond, teinte secondaire, halo doux et ombre portée ; entrées de sidebar : décalage, surbrillance, icône qui pivote ; curseur `pointer` sur tout élément cliquable.

## 13. Phase D : S2 (tuiles), transition, frise (19/10/2026)

- **S2** : neuf tuiles qui se posent en 3D ; survol = relief, inclinaison vers le curseur et lueur qui suit la souris ; clic = la tuile se retourne sur sa description. Étape 2 (transition) : les tuiles quittent la grille une à une, le logo ANDRIA se désassemble (grille de cases en sens inverse), les partenaires s'effacent et les années s'écartent de chaque côté (pose `split`).
- **Frise (S3)** : la ligne « Projet LXP » (cliquable) entre les deux années ; au clic elle s'étend de juin 2022 à novembre 2026 pendant que la caméra la suit (les cartes apparaissent à l'arrivée du bout de la ligne), puis rewind sur la première étape. Ensuite une PAUSE par étape (la caméra passe de l'une à l'autre) ; cliquer une carte voisine y va, cliquer la carte active ouvre sa scène (`enterBranch`), ← revient à la frise.
- **Dates** : seules sont affichées les bornes connues (juin 2022 – février 2024 pour la phase 1, phase 2 cofinancée FSE, novembre 2026) ; les sept étapes de la phase 2 sont placées dans l'ordre indicatif sans date. À valider.
- **Défaut corrigé** : `immediateRender` ne pose l'état de départ qu'à la construction ; des éléments partagés entre scènes (logo, années) étaient alors laissés dans l'état d'une autre timeline. Le logo continu était visible dès le début (la grille de cases ne se voyait pas) puis disparaissait un instant : c'était le « flash ». `Deck.fx.ft` ajoute maintenant un `set` à t=0 qui réapplique l'état de départ à chaque rendu. Mesuré : la quantité d'encre du logo croît de façon monotone, sans creux.

- **Style des cartes (19/10, retour)** : la lèvre épaisse en bas des cartes faisait « fausse 3D ». Tuiles, tableau, familles d'objectifs, lignes LMS/LXP, citation et cartes de la frise utilisent maintenant une élévation douce (`--elev`, `--elev-sm`). La pile de plaques (S1) garde son épaisseur (`--edge`), validée. Les lignes LXP ne s'éclatent plus en profondeur. Bouton chevron ajouté sur l'écran des deux années, infobulle « HyperFrames Composition » retirée.

- **Retours suivants (19/10)** : LMS/LXP refait en tableau comparatif (colonne LXP mise en avant, plus aucun trait séparateur ni flèche, survol par ligne) ; la transition S2 enchaîne directement sur la frise (plus d'écran vide avec les deux années ; rappel `tl.call` qui n'agit qu'à la lecture, donc ← revient bien aux tuiles) ; survol du bouton « Projet LXP » sans halo : soulèvement + ombre qui s'approfondit.

- **Frise (retours 19/10)** : les pastilles « Phase 1 / Phase 2 » sur la ligne sont remplacées par deux bandes de fond séparées par un espace (février 2024), avec le titre de chaque phase en haut à gauche ; les cartes n'affichent plus « Phase x » (seule la période du prototype reste) ; « Novembre 2026 » est aligné sur la fin de la ligne. Les éléments invisibles ne captent plus la souris (`pointer-events` activé à l'apparition) : la pile de plaques cachée bloquait le survol des lignes du tableau LMS/LXP.

- **Frise : cartes qui disparaissaient** (19/10) : la caméra défilait vers la droite, les cartes posées sortaient donc par la gauche, puis réapparaissaient au rewind. Désormais la caméra recule (zoom arrière) pendant que la ligne s'étend : toute la frise reste visible, puis le rewind zoome sur la première étape.

- **Frise (correction de la correction)** : le zoom arrière changeait trop l'animation, retour au défilement de caméra. Le bout de la ligne reste fixe à ~1250 px du bord gauche (la caméra le suit après un court départ) : les cartes entrent par la droite et se posent, puis défilent à la vitesse de la caméra au lieu de surgir au milieu de l'écran.

- **Frise : vrai bug d'apparition/disparition** (19/10) : la bande de phase (plan z=0) et les cartes (z=0 à l'arrivée) étaient coplanaires ; quand la caméra s'incline, le tri 3D du navigateur pouvait passer une carte derrière la bande. Plans de profondeur fixes : bandes z=-40, ligne z=0, repères z=20, cartes z=40, bouton et étiquette de fin z=60. Mouvements ralentis (extension 6,6 s, rewind 3,2 s, étapes 1,6 s).

- **Frise : alignement** (19/10) : le plan de la frise est désormais plat (`transform-style: flat`) et c'est un conteneur fixe (`.tiltwrap`) qui s'incline : plus de parallaxe entre ligne, points, tiges et cartes. Mesuré à chaque étape : point, carte et chevron sont centrés à 960 px (écart 0). Les points apparaissent exactement quand le bout de la ligne les atteint ; le titre de phase est au-dessus des cartes du haut et la bande s'arrête avant le chevron.

## 14. Phase E : scènes détaillées (19/10/2026)

- **Socle commun** : barre d'actions (« ← Frise » = `controller.back()`, « Voir en démo » = ouverture de https://lxp.dev.step.eco dans un nouvel onglet, via le parent car l'iframe est en sandbox), boutons avec survol GSAP. En fin de scène détaillée, « suivant » ramène à la frise.
- **Raccourci de développement** : `dist/index.html#content` (ou `#frise`, puis les autres identifiants) ouvre directement la scène, avec retour à la frise.
- **Scène 2 « Créer du contenu »** (faite) : étape 1 = parcours en six niveaux (Organisme de formation, Parcours, Module, Cours, Leçon, Activités) en pile de plaques 3D et liste en escalier, survol liaison plaque/liste ; étape 2 = éditeur riche (barre d'outils, document qui s'écrit) et palette des six types d'activité (Texte, Image, Vidéo, Contenu intégré, Ressource, Fichier), cliquable.
- **Piège** : chaque scène détaillée doit avoir sa propre plage de temps (`data-start` unique, de 38 à 66 par pas de 4) ; deux scènes sur la même plage s'affichent à la place l'une de l'autre.
- **Reste** : prototype (1), assistant virtuel (3), évaluer (4), organiser (5), suivre et accompagner (6), piloter (7), personnaliser et encourager (8).

- **Éditeur interactif** (19/10) : cliquer un type d'activité de la palette ajoute un bloc correspondant au document (5 blocs au plus, défilement automatique vers le bas, croix pour retirer) ; gras et italique de la barre d'outils agissent sur le paragraphe ; tout est remis à zéro en quittant la scène.

- **Éditeur : un aperçu par type d'activité** (19/10) : le LXP expose cinq types (texte, image, vidéo, contenu interactif, ressources ; `activity-type-selection.tsx`), pas six : la scène en montre cinq. L'aperçu texte est strictement celui d'origine. Les autres reprennent la structure des composants du LXP : en-tête d'activité (titre + « Annuler »), formulaire vidéo (description, provenance, lien, « Aperçu de la vidéo », « Sauvegarde »), éditeur d'image, contenu interactif (champ URL, message « Saisir une URL ci-dessus pour prévisualiser le contenu. »), liste de ressources (ajout / corbeille). Frise : flèche au bout de la ligne qui suit le trait.

- **Frise : sens de l'inclinaison** (20/10) : l'inclinaison de la caméra est inversée (constantes `TILT_FWD`, `TILT_STEP`, `TILT_BACK` en tête de `scene-frise.js`) : +8° quand la frise défile vers 2026, -9° au retour vers 2022, +4° entre deux étapes. Session de développement : `npm run scene -- <scène>` (`tools/dev-server.mjs`, rechargement automatique).

- **Scène 1 « Un prototype pour valider l'idée »** (20/10) : trois pauses. (0) fil de la phase 1 (juin 2022 → février 2024) qui se trace avec un point par étape, et trois cartes qui se retournent (analyse concurrentielle, personas et besoins, premier prototype ; détails issus du pitch) ; (1) architecture en couches (Exploration IA, Interface React, API Node.js / Express, Données PostgreSQL et MongoDB, Livraison CI/CD), survol = détail ; (2) faisabilité validée et passage à la phase 2. Raccourci `npm run scene -- proto`.

- **Proto : affichage** (20/10) : les libellés des couches débordaient des plaques (plaques élargies 880 → 520 px, police 26 px, pile réduite à 0,84 pour tenir dans l'écran) ; titre sur une ligne ; ordre des couches corrigé : Livraison CI/CD à la base, puis Données, API, Interface, et Exploration IA au sommet (plaque accentuée).

- **Proto, dernière pause refaite** (20/10) : plus de carte ressemblant à un bouton. Faisabilité validée, trois acquis (marché analysé, besoins recueillis, prototype déployé), puis le fil se prolonge de la fin de la phase 1 (février 2024) vers la phase 2 (2024 – 2026) avec la phrase de cadrage en texte simple.
- **Frise** : chevron latéral « étape suivante » à droite, sous la ligne (classe `.chevron.side`, clignote horizontalement, survol comme les autres chevrons).

## 15. Scène 3 « Un assistant disponible 24 h/24 » (20/10, branche feature/assistant-scene)

- Trois pauses : (0) lanceur de l'assistant (avatar rond avec l'icône `bot` du LXP, bulle « Besoin d'aide ? Le chatbot ANDRIA est là pour vous aider. », éventail de questions : « À quoi sert cette page ? », « À quoi servent les menus ? », « Comment créer une formation ? », « Autres questions ») ; (1) cours et conversation : passage surligné, « Demander à l'IA », notice « Une question sur ce passage ? », question, réponse, sources (« Contenus de cours associés »), suggestion « Générer un quiz » ; (2) la recommandation : quiz avec bonne et mauvaise réponses.
- Interactions : clic avatar = fermer/rouvrir l'éventail ; clic pilule = passer à la conversation ; clic sur un passage puis « Demander à l'IA » = autre conversation ; « Générer un quiz » = quiz ; réponses du quiz.
- Les réponses de l'assistant sont des **exemples scénarisés** (aucun appel à l'IA), indiqué dans les notes du présentateur. Libellés repris de `front/src/features/chatbot`.

- **Retours du 20/10** : scène « Créer du contenu » : un clic sur un niveau (plaque ou liste) le sélectionne : plaque soulevée, niveaux parents soulignés (emboîtement), et le bloc de texte devient la fiche du niveau (rôle et exemple) ; nouveau clic = retour. Bouton « Frise » retiré des scènes détaillées (retour par la touche ← ou en fin de scène). Sidebar compacte de S1 : largeur 128 px et marges corrigées, icônes centrées. Proto : numéros 1 2 3 retirés des cartes.

- **Assistant : lanceur animé comme dans le LXP** (20/10) : l'avatar arrive par translation depuis la droite (`x:40→0`), la bulle « ... » (trois points qui pulsent) apparaît à sa gauche, puis laisse la place au message « Besoin d'aide ? … » pendant que l'icône oscille (rotation -8° puis 5° puis 0) et que les yeux clignent (volets `clipPath` sur les deux yeux du `bot`, comme `dashboard-eye-shutter` de brag). Pas de bulle d'attente dans la conversation.

## 16. Scène 4 « Évaluer » (20/10, branche feature/assess-scene)

- Trois pauses : (0) quatre types de quiz du LXP (QCM, vrai ou faux, associations, ordre) avec onglets, « Évaluation initiale », badges « Bonne réponse » / « Votre réponse », échange de deux réponses (associations et ordre) ; (1) « Résultats du diagnostic » (« Détail des réponses », « Démarrer le module ») avec anneau de score ; (2) « Travail remis », « Barème d’évaluation », « Notation » par critères, total coloré selon les seuils du LXP (60 % vert, 40 % orange), « Commentaire », « Enregistrer la note » puis « Note enregistrée ».
- Données **fictives** (questions, notes, critères, texte de l’apprenant), indiquées dans les notes du présentateur. Interactions : onglets, réponses, échanges, clic sur une note (cycle 0 à 5), enregistrer.
- Corrigé au passage : un panneau masqué gardait `pointer-events:auto` et interceptait les clics de l’étape suivante.

## 17. Scène 5 « Organiser » (20/10, branche feature/organize-scene)

- Quatre pauses, une par outil : (0) calendrier d’un parcours (octobre 2026, cours, devoirs, modules ; légende = filtre ; un événement ouvre ses détails et « Accéder au… ») ; (1) médiathèque (onglets Images, Vidéos, Audios, Ressources ; tri par date, taille, nombre d’utilisations) ; (2) groupes (« Formation - Parcours », « Nombre d’apprenants », informations du groupe, formateurs) ; (3) tags (« Liste des tags », ajout des exemples du LXP, suppression).
- Données **fictives** (noms de fichiers, groupes, formateurs, tags, événements), indiquées dans les notes du présentateur. Pas de champ de saisie réel : les flèches du clavier restent réservées à la navigation.
- Retour du 20/10 : première version trop compacte et vide ; cartes agrandies, textes à 32 px et plus, lignes supplémentaires.

## 18. Scène 6 « Suivre et accompagner » (20/10, branche feature/care-scene)

- Quatre pauses : (0) préférences (rythme préféré, préférences d’apprentissage) et progression par semaine ; (1) « Comment vous sentez-vous aujourd'hui ? » avec les cinq pictogrammes météo du LXP qui se transforment l’un en l’autre ; (2) « Alertes », « Risque de décrochage », signal « Engagement en perte de vitesse », courbes Réussite / Échec / Abandon, « Voir les données utilisées » ; (3) « Votre retour sur cette analyse » (avis, devenir de l’apprenant, « Enregistrer le retour »).
- Données **fictives**, aucune amélioration causée par l’IA n’est revendiquée.
- Correctif de fond : des classes génériques des scènes Évaluer et Suivre (`.chip`, `.pb`, `.lv`, `.rrow`) écrasaient les styles d’anciennes scènes (pastille sur les dates de la frise, scène proto, pyramide). Renommées (`.cchip`, `.wkb`, `.mlv`, `.dgrow`). **Règle** : préfixer les classes de chaque scène ou les scoper sous `#scene-…`.

## 19. Textes externalisés en JSON (20/10/2026, branche feature/content-json, bâtie sur feature/care-scene)

- **Tous les textes sont dans `content/`** : `deck.json` (communs : titre, URL de démo, logos, années, boutons) et un `scenes/<id>.json` par scène (`label`, `notes` du présentateur, puis les textes dans l'ordre de lecture). Mode d'emploi : `content/README.md`.
- **Mécanisme** : le HTML porte des liaisons `data-tx` (préfixe choisi pour ne pas heurter les `data-t`, `data-d`, `data-n`… des scènes Organiser et Suivre) ; `composition/js/bind.js` les remplit avant les scripts de scène, à partir de `composition/js/content.js` généré par `tools/sync-content.mjs` (script classique : `file://` et `dist/` fonctionnent). Les scripts lisent les textes dynamiques par `Content.text("scène.clé")`.
- **Données de scénario sorties du HTML et des scripts** : réponses de l'assistant (`assistant.conversation.passages`), retours du quiz, associations et ordre (`assess.types.quiz.qbody.qp.2/3`, avec `startOrder` pour la disposition mélangée de départ), modèle « Accéder au {0} », tags suggérés, libellés « Voir / Masquer les données utilisées ».
- **Contrôles** : la synchronisation échoue si une clé liée manque, avertit si un texte n'est lu par personne. Rendu par défaut vérifié identique à l'ancien HTML (comparaison de DOM, 3781 nœuds), toutes les scènes parcourues sans erreur dans Chrome, interactions des scènes 3 à 6 relevées (textes dynamiques identiques), `hyperframes check` passe.
- **Limites** : le nombre d'éléments d'une liste est celui du HTML ; les valeurs de tri de la médiathèque (`data-size`, `data-used`, `data-date`) et les nombres affichés (notes, compteurs) restent dans le HTML.
- **Reste à faire** : morphing 3D des pictogrammes d'humeur de « Suivre et accompagner » (demande du 20/10, branche à part), phase G (finition), phase H (dépôt), navigation globale (§23). Les huit scènes détaillées sont réalisées (§20 et §21).

## 20. Scène 7 « Piloter » (20/10/2026, branche feature/content-json)

- Quatre pauses : (0) « Tableau de bord IA » (total « Tokens consommés ce mois-ci » qui monte, utilisation par promotion en barres, « Top consommateurs de tokens ») ; (1) « Classement de mes cours » (étoiles d'après la note, « Afficher plus ») ; (2) « Import de cours » (Moodle) et « Importer un parcours » avec progression puis résultat ; (3) tableaux de bord par rôle (Apprenant, Équipe pédagogique, Administrateur).
- Libellés repris du LXP (`dashboard-ia`, `dashboard-admin`, `CourseImport`, libellés de rôles). **Données fictives** (noms, tokens, notes, résultats d'import), indiquées dans les notes du présentateur.
- Écrite **JSON d'abord** (`content/scenes/steer.json`) puis HTML et script, sur le modèle de la scène 6. Les valeurs numériques qui pilotent l'animation (`part` des barres) sont dans le JSON ; les étoiles se déduisent de la note affichée ; le total se recompte depuis son texte (animation ignorée si ce n'est pas un nombre simple).
- Classes préfixées `pi-` et scopées sous `#scene-steer` (règle du §18). Un estompage appliqué à un conteneur déjà animé par la timeline entre en conflit avec elle : il est porté par les enfants.

## 21. Scène 8 « Personnaliser et encourager » (20/10/2026, branche feature/personalize-scene)

Règle de travail à partir d'ici : **une branche par séquence**.

- Quatre pauses : (0) « Personnalisation de l'interface » : thèmes clairs (Classique, Océan, Lin, Forêt) et sombres (Classique sombre, Aurore, Braise, Abysses), un clic recolore l'aperçu (variables `--m-*` interpolées, palettes de `front/src/index.css`) ; (1) « Identité de l'organisme » (nom, site, logo, « Sauvegarder », l'aperçu reprend le nom) ; (2) « Template de l'e-mail » : six modèles (Classique, En-tête compact, Éditorial, Invitation, Bannière, Épuré), aperçu qui change, « Envoyer un e-mail de test » ; (3) « Félicitations, vous avez terminé tous les cours de ce module ! », « Badges obtenus » / « Badges restant à obtenir » (un clic obtient le badge) et « Mon historique d'accomplissements ».
- Libellés repris du LXP (`instance-general-settings`, `email-template-settings`, `module-completion-modal`, journal). Données **fictives** (nom d'organisme, badges, dates), indiquées dans les notes du présentateur. Confettis déterministes (positions fixes, pas de `Math.random`).
- JSON d'abord (`content/scenes/personalize.json`), classes préfixées `pz-` sous `#scene-personalize`. Le placeholder commun `deck.ui.placeholder` est supprimé : il n'y a plus d'écran « à venir » dans les scènes détaillées.
- Les palettes sont une **configuration** de la scène (`THEMES` dans `scene-personalize.js`), pas du texte : elles ne sont pas dans le JSON.

## 22. S5 « L'interface au fil des mois » (20/10/2026, branche feature/closing-scene)

- **Scène réalisée** (`composition/js/scene-closing.js`, `content/scenes/closing.json`) : 16 pauses = 15 captures (navigateur factice, fondu enchaîné, date, titre, 1 à 3 fonctionnalités) puis le dernier plan. En bas, une frise de 15 repères (années repérées automatiquement, repère cliquable = saut direct) se remplit au fil des pauses ; au dernier plan elle monte au centre, se prolonge d'une flèche pointillée « Le projet continue d'évoluer », le bandeau d'identité (logo, partenaires, 2022 2026) revient et le bouton mène à la démo.
- **Données dans le JSON** : `snapshots[]` (`date`, `titre`, `fonctions` jusqu'à 3, `image`) ; `_commit` garde le commit d'origine (clé ignorée par la présentation). Le nombre de captures est celui du HTML (15) ; une fonctionnalité vide est masquée.
- **Dates et commits** issus de l'historique du dépôt (`git log --first-parent --merges -- front/src`) ; **les titres et fonctionnalités sont déduits des titres de pull requests et restent à valider.**
- **Captures réelles** (`npm run snapshots`, `tools/snapshots/`) : pour chaque jalon, le commit est exporté (`git archive`, le dépôt LXP n'est jamais modifié), ses dépendances installées et le front construit avec **sa propre chaîne de build** (CRA en 2023, Vite 4 / 6 / 8 ensuite), puis servi en statique et ouvert dans Chrome avec **tous les appels d'API simulés** (données fictives : `fixtures/modern.mjs` pour l'API récente, `fixtures/kitchen.mjs` pour les anciennes). Les 15 captures sont de vraies interfaces d'époque (1440 × 900, WebP, ~40 Ko). Un jalon = une entrée de `tools/snapshots/captures.mjs` (route, réponses simulées, navigation ou clic). `node tools/snapshots/run.mjs 5` refait un jalon, `--seen` liste les appels d'API, `--route` et `--out` servent à explorer. Un build réussi est conservé dans `.snapshots-cache/` (ignoré par git).
- **Écrans retenus** (titres et fonctionnalités du JSON alignés sur ce qui est visible) : 2023-06 formulaire « Créer un groupe de formation » ; 2023-09 édition de parcours en cinq étapes ; 2023-12 profil ; 2024-03 tableau de bord à graphiques ; 2024-09 liste des groupes ; 2024-12 médiathèque ; 2025-04 liste des parcours ; 2025-09 premier assistant « A.L.A.A. » ; 2025-12 calendrier ; 2026-03 tableau de bord IA (mêmes chiffres que la scène « Piloter »), puis l'ancien tableau de bord ; 2026-10 le nouveau tableau de bord, la gestion des parcours, la médiathèque et les tags. Le quiz formatif adaptatif et les badges n'ont pas été capturés (scénarios de données trop lourds) : leurs jalons montrent un autre écran de la même date.
- **Limites** : la date affichée dans le calendrier est celle du jour de capture ; certaines anciennes versions n'ont ni gestion d'erreur ni état vide soigné (une capture reflète ce que l'application affichait alors) ; les noms, dates, chiffres sont fictifs.
- **Navigation directe** : `#closing` (et tout identifiant de diapositive de premier niveau : `start`, `intro`, `what`, `traits`) ouvre directement la diapositive.
- **Fin de parcours (retour du 20/10)** : au lieu du seul tableau de bord actuel, la série se termine par l'**ancien tableau de bord** (commit de mars 2026 : actions rapides en boutons, tableau des parcours), puis le **nouveau tableau de bord**, puis trois autres pages de la nouvelle interface au même commit (gestion des parcours, médiathèque, tags). Le profil apprenant de septembre 2026 a été retiré (il plantait faute de données simulées). Fixtures des pages de gestion : `modernPages` dans `tools/snapshots/fixtures/modern.mjs`. La frise de la scène passe à 15 repères ; les fragments de la clôture sont espacés de 0,48 s pour tenir dans les 8 s de la scène.
- **Dernier écran de la clôture (retour du 21/10)** : au lieu des tags, un comparatif de la page de connexion, 2023 (commit `8204569ef`, visuel fixe) face à 2026 (commit `57087787e`, fond tiré de l'API Unsplash), avec la recherche (`abstract architecture minimal`) et quatre vraies photos Unsplash qui se succèdent. Captures : `node tools/snapshots/login.mjs` (photos servies depuis `composition/assets/connexion/`, sans réseau ni clé d'API). Ce dernier écran dure 7,3 s (`CMP` dans `scene-closing.js`) au lieu de 2,4 s ; son étape se termine après la quatrième photo.

## 23. Navigation globale (demande du 20/10/2026, branche feature/navigation-globale)

Un numéro de diapositive très discret, et une grille (plan de la présentation) accessible de partout pour revenir **sans latence** à n'importe quel endroit.

- **Numéro** : « 7 / 14 » en bas à gauche (12 px, opacité 0,28, plein au survol), masqué sur l'écran de départ. L'ordre est celui de la présentation : diapositives d'ouverture, les huit scènes détaillées, puis la clôture.
- **Plan** : clic sur le numéro ou touche **G** (même quand le focus est dans une scène : `deck.js` relaie G et Échap à la page parente). Grille de 14 miniatures numérotées, la scène courante en relief ; flèches pour se déplacer, **Entrée** ou clic pour y aller, **Échap** ou **G** pour fermer. Les entrées, libellés et textes (`deck.json` → `ui.nav`) sont générés par `npm run sync` dans le wrapper (`#nav-data`).
- **Sans latence** : le saut passe directement par `controller.syncTo(séquence, diapositive, pause)` (y compris pour les scènes détaillées, sans repasser par la frise) : mesuré à ~30 ms dans Chrome, scène affichée à son état initial.
- **Miniatures** : `npm run thumbs` (`tools/thumbnails.mjs`) ouvre chaque scène avec le même saut que le plan et la capture en WebP (`composition/assets/thumbs/`, ~15 Ko chacune). À relancer quand une scène change visuellement.
- **Code** : `ui/nav.js` et `ui/nav.css` (copiés dans `dist/ui/`), marquage dans `index.html`. Fonctionne en développement (`npm run scene`) et en `file://` (`dist/index.html`, testé).

## 24. « Suivre et accompagner » : morphing 3D de l'humeur (20/10/2026, branche feature/care-mood-morph)

Demande : reprendre, pour l'étape « humeur », le morphing 3D de la séquence Hyperframes de `lxp/brag-output`.

- **Un seul pictogramme en relief** remplace les cinq pictogrammes qui se fondaient l'un dans l'autre : dix couches SVG identiques empilées en profondeur (`--depth`, `translateZ`, teinte qui s'éclaircit vers l'avant, ombre portée sur la couche de face) dans `.feeling-3d`, comme dans `brag-output/composition/motion.js`. Les cinq états sont les tracés `data-level-1…5` du pictogramme (orage, pluie, éclaircies pluvieuses, nuageux avec éclaircies, soleil).
- **MorphSVG** (`composition/assets/MorphSVGPlugin.min.js`, même version 3.14.2 que GSAP, repris de `brag-output`) déforme réellement le tracé de toutes les couches d'un état à l'autre ; l'icône fait un tour complet sur elle-même avec un léger bond vers l'avant à chaque changement. Démonstration automatique de l'orage au soleil voilé (étape 1), puis **un clic sur un niveau** rejoue le même morphing (état final remis à zéro à la sortie de la scène ; sans animation en `prefers-reduced-motion`).
- Le plugin est chargé par `composition/index.html`, enregistré dans `scene-care.js` ; `tools/build-dist.mjs` ne le recopie pas dans `dist/assets` (il est déjà inliné).

## 25. Phase G : finition (20/10/2026, branche feature/finition)

- **Reduced-motion** : testé sur les 14 scènes avec `prefers-reduced-motion: reduce` émulé : aucune erreur, chaque étape s'affiche en moins de 0,35 s, aucune animation infinie (chevrons, message de départ, survols sont gardés par le test dans `deck.js`). Rien à corriger.
- **Responsive** : composition 16:9 mise à l'échelle par le player ; essais à 1280×720, 1024×768, 2560×1440, 844×390 et 390×844 : pas de défilement horizontal, numéro de diapositive toujours dans l'angle. Le plan de navigation passe de 5 colonnes à 2 sur téléphone (colonnes jamais sous 160 px, le plan défile) : corrigé. La présentation reste conçue pour un écran large (en portrait elle est réduite dans un cadre 16:9).
- **Navigateurs** : Chrome et **WebKit** (moteur de Safari, via Playwright 1.63 pour la révision 2359 en cache) : les 14 scènes se chargent sans erreur, la 3D (`preserve-3d`), le morphing, les miniatures et le plan fonctionnent. **Firefox : non testé** (pas de binaire disponible) ; à essayer avant la présentation.
- **Mode présentateur** (`P`) : ouvre une fenêtre d'audience et affiche notes, étape suivante et chronomètre dans la fenêtre principale. Les libellés du bandeau (« UP NEXT », « SLIDE », « ELAPSED ») viennent du bundle `vendor/` et restent en anglais.
- **Poids** : `dist/index.html` 0,8 Mo, `dist/` complet environ 1,8 Mo, zip de 1 Mo.
- **Export** : `npm run zip` (`tools/zip-dist.mjs`) produit `lxp-showcase-2026.zip` avec un `LISEZMOI.txt` (touches, ouverture). Testé : décompressé dans un autre dossier, ouvert en `file://`, plan et miniatures fonctionnent.
- **Reste** : essai sur Firefox, relecture des textes (jalons S5, dates de la frise, objectifs), puis phase H (dépôt).
