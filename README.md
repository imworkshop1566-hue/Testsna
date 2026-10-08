# ToolyTools — Soft Minimal Style Lab

This is a **local testing project** at `F:\Project\ToolyToolsStyleDemo`.
The production website at https://toolytools.com is not modified.

## Direction

A calm, content-first, ChatGPT-inspired **Soft Minimal UI**, not a copy of
ChatGPT branding or its exact screens. Flat neutral surfaces, good typography,
unobtrusive borders, generous breathing room and rounded controls. No colored
background patterns, transparency effects or hard-offset shadows.

- Two appearance modes: Light and Dark. Both are defined in `minimal.css`.
- The color preference persists using localStorage.
- Homepage: four original ToolyTools folders, a 2x2 grid on phone and desktop.
- Click a folder to open a clean, responsive tool-list dialog. Mobile uses
  a simple bottom sheet. Close by close button, background click or Escape.
- Tool list items display a demo notice; no real tool URL is invented.
- Component Lab remains interactive: input, select, buttons, tabs and results.
- Cookie banner is a demo, not an analytics integration.

## Open

Double-click `index.html` on your computer, or visit the testing-only
GitHub Pages site at https://imworkshop1566-hue.github.io/Testsna/

## Files

- `index.html` — local style demo, homepage and Component Lab.
- `styles.css` — structural layout and responsive base.
- `interaction.css` — folder and dialog structural layout.
- `minimal.css` — active design system tokens, surfaces and Light/Dark states.
- `refined.js` — modal, accessibility, localStorage and component interactions.
- `README.md` — this file.

Only local/static HTML/CSS/JavaScript; no build or third-party dependencies.

## Reusable design tokens

Semantic tokens in `minimal.css`: `--bg`, `--surface`,
`--surface-2`, `--text`, `--muted`, `--border`, `--accent`,
`--on-accent`, `--focus`, `--ds-*`.

The priority for further development is real product usability, contrast,
small-screen readability, meaningful hover/focus feedback and consistent tools.
