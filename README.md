# Showcase LXP 2026

Présentation interactive d'ANDRIA (2022 – 2026), en HTML, CSS et JavaScript. Elle s'ouvre dans n'importe quel navigateur.

Utiliser un agent IA codex ou claude pour modifier les animations des composants, pour du simple contenu voir plus bas.

## Voir la présentation

```
npm run build
```

Puis double-cliquer sur `dist/index.html`.

Navigation : flèches `←` `→`, espace ou clic. Touche `P` : mode présentateur.

## Modifier une scène

```
npm run scene -- proto
```

Ouvre la scène dans le navigateur et recharge la page à chaque modification. Scènes possibles : `frise`, `proto`, `content`, `assistant`, `assess`, `organize`, `care`, `steer`, `personalize`.

## Si je veux modifier le contenu sans l'IA, je fais comment ?

- `content/` : **tous les textes** (un fichier JSON par scène, notes de présentateur, URL de démo, années). Voir `content/README.md`. Aucune modification du HTML nécessaire : `npm run build` applique les changements.
- `composition/index.html` : la structure des scènes (à ne modifier que pour ajouter ou retirer un élément)
- `composition/js/scene-*.js` : l'animation de chaque scène
- `composition/css/` : le style
- `PLAN.md` et `SCRIPT.md` : le plan et le script de la présentation
