# Textes de la présentation

Tous les textes affichés sont ici, en JSON. Le HTML (`composition/index.html`) ne se modifie pas pour changer un texte.

```
content/
├─ deck.json            titre de l'onglet, URL de démo, logos et années, mention de cofinancement, boutons communs
└─ scenes/
   ├─ start.json  intro.json  what.json  who.json  traits.json  frise.json  closing.json
   └─ proto.json  content.json  assistant.json  assess.json  organize.json  care.json  steer.json  personalize.json
```

Un fichier par scène. Les deux premières clés sont toujours les mêmes :

| Clé | Rôle |
|---|---|
| `label` | nom de la scène (lecteurs d'écran, liste des scènes) |
| `notes` | notes du mode présentateur (touche `P`) |

Le reste suit l'ordre de lecture de la scène (`what.json` : `definition`, `sidebar`, `problems`, `goals`, `compare`).

## Appliquer une modification

```
npm run build        # puis ouvrir dist/index.html
npm run scene -- what  # session de travail : la page se recharge à chaque enregistrement de content/*.json
```

`npm run build` et `npm run scene` lancent la synchronisation (`tools/sync-content.mjs`) : elle assemble les JSON dans `composition/js/content.js` (fichier généré, ne pas l'éditer), recopie `label` et `notes` dans l'île du slideshow, puis contrôle les clés.

## Règles d'écriture

- **Gras** : entourer de `**` (`"Une **plateforme** d'apprentissage"`). C'est la seule mise en forme possible ; le reste est du texte brut (`<` et `>` s'affichent tels quels).
- **Listes** (tuiles, étapes, lignes du tableau LMS / LXP…) : le nombre d'éléments est celui du HTML. On modifie les textes, on n'en ajoute pas. Ajouter un élément demande une intervention sur le HTML et la scène.
- **Chaîne vide** : `""` masque l'élément quand il est facultatif (par exemple `frise.json` → `steps[i].period`, la pastille de date d'une étape).
- **Années** : `deck.json` → `stage.years` (4 caractères, un par chiffre animé). Elles servent à l'ouverture et à la frise.
- **URL de démo** : `deck.json` → `demoUrl` (le bouton « Voir en démo » ouvre un nouvel onglet, en `https` uniquement).
- **Clés commençant par `_`** (`_prevu`) : notes de travail ignorées par la présentation (messages prévus pour les scènes pas encore réalisées).
- **Modèles** `{0}` : `deck.json` → `ui.showDetail` et `ui.showPreview` forment les libellés d'accessibilité (« Suivi : afficher le détail »). `{0}` est remplacé par le titre.

## Contrôles automatiques

La synchronisation s'arrête avec une erreur si le HTML ou un script lit une clé absente du JSON (faute de frappe, clé supprimée). Elle avertit (sans bloquer) si un texte du JSON n'est lu par aucune scène.

## Pour les développeurs

- Liaison dans le HTML : `data-tx="clé"` (texte), `data-tx-<attribut>="clé"` (`aria-label`, `alt`, `data-label`, `data-open`), `data-tx-split="clé"` (un `<i>` par caractère), `clé|autre.clé` (modèle avec `{0}`). Exécutée par `composition/js/bind.js` avant les scripts de scène.
- Dans un script de scène : `Content.text("scene.cle")` ou `Content.get("scene.liste")`. Ne jamais écrire un texte visible en dur dans un script.
- Nouvelle scène : créer `content/scenes/<id>.json` (avec `label` et `notes`), lier les textes dans le HTML. La synchronisation refuse une scène de l'île sans fichier de contenu.
