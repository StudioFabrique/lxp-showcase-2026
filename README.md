# Showcase LXP 2026

Présentation interactive d'ANDRIA (2022 – 2026), en HTML, CSS et JavaScript. Elle s'ouvre dans n'importe quel navigateur.

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

## Où est quoi

- `composition/index.html` : le contenu de toutes les scènes
- `composition/js/scene-*.js` : l'animation de chaque scène
- `composition/css/` : le style
- `PLAN.md` et `SCRIPT.md` : le plan et le texte de la présentation
