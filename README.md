# Showcase LXP 2026

Présentation interactive d'ANDRIA (2022 – 2026), en HTML, CSS et JavaScript. Elle s'ouvre dans n'importe quel navigateur, hors ligne.

Utiliser un agent IA codex ou claude pour modifier les animations des composants, pour du simple contenu voir plus bas.

## Voir la présentation

```
npm run build
```

Puis double-cliquer sur `dist/index.html`. Pour la donner à quelqu'un : `npm run zip` crée `lxp-showcase-2026.zip` (1 Mo, à décompresser puis ouvrir `index.html`).

| Touche | Action |
|---|---|
| `→`, espace, clic sur le chevron | étape suivante |
| `←` | étape précédente |
| `G` (ou le numéro en bas à gauche) | plan de la présentation : saut direct vers n'importe quelle scène, flèches + Entrée, Échap pour fermer |
| `P` | mode présentateur (notes, étape suivante, chronomètre) |

Testé dans Chrome et WebKit (le moteur de Safari), en `file://`, du 1024 × 768 au 2560 × 1440, avec `prefers-reduced-motion`. Firefox n'a pas été testé (aucun Firefox disponible sur le poste de développement).

## Modifier une scène

```
npm run scene -- proto
```

Ouvre la scène dans le navigateur et recharge la page à chaque modification. Scènes possibles : `who`, `frise`, `proto`, `content`, `assistant`, `assess`, `organize`, `care`, `steer`, `personalize`, `closing`.

## Si je veux modifier le contenu sans l'IA, je fais comment ?

- `content/` : **tous les textes** (un fichier JSON par scène, notes de présentateur, URL de démo, années). Voir `content/README.md`. Aucune modification du HTML nécessaire : `npm run build` applique les changements.
- `composition/index.html` : la structure des scènes (à ne modifier que pour ajouter ou retirer un élément)
- `composition/js/scene-*.js` : l'animation de chaque scène
- `composition/css/` : le style
- `PLAN.md` et `SCRIPT.md` : le plan et le script de la présentation

## Outils

| Commande | Rôle |
|---|---|
| `npm run build` | synchronise les textes puis construit `dist/` |
| `npm run zip` | `build` puis `lxp-showcase-2026.zip` |
| `npm run check` | contrôle Hyperframes (lint, mise en page, mouvement, contraste) |
| `npm run thumbs` | régénère les miniatures du plan (à relancer quand une scène change visuellement) |
| `npm run snapshots -- 5` | refait une capture de la scène « L'interface au fil des mois » (voir `PLAN.md` §22) |

`npm install` n'est nécessaire que pour `thumbs` et `snapshots` (Chrome requis). `npm run zip` n'a besoin que de l'outil `zip` du système.
