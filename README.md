# ToolyTools — Calm Workspace (ChatGPT-inspired 80% + Notion-inspired 20%)

Static, demo-only UI at `F:\Project\ToolyToolsStyleDemo`.
No changes to the production https://toolytools.com website.

## Design direction

- **ChatGPT-inspired (80%)**: neutral white and charcoal surfaces, generous
  whitespace, thoughtful typography, rounded controls, gentle focus/hover
  states and no distracting effects.
- **Notion-inspired (20%)**: subtle grouping, four muted folder palettes,
  descriptive subtitles, small category/count labels and tidy information
  hierarchy. No external branding or copying app assets.
- **Tool identity**: eight distinct, saturated, solid-color tool icons with
  readable white initials. Only the tool icons are vivid; folder surfaces and
  page layout remain quiet. Colors persist across Light and Dark.
- Responsive **two-column / 2x2 folder home** and a clean list-based folder
  dialog (bottom sheet on mobile).
- **Light and Dark** both supported; user choice stored in localStorage.
- Cookie banner and Component Lab remain interactive demos.

Folder contents are mockups; tapping tool items shows a demo notice.
The demo does not invent navigation destinations.

## Preview

Double-click `index.html` in Edge/Chrome or open the test-only hosted site:
https://imworkshop1566-hue.github.io/Testsna/

## Source files

- `index.html` — homepage, clickable folders and Component Lab.
- `styles.css` — responsive structural styles.
- `interaction.css` — folder grid and dialog structures.
- `minimal.css` — minimal base and Light/Dark semantic tokens.
- `workspace.css` — **active ChatGPT/Notion-inspired design refinement**,
  collection metadata, responsive typography and subtle folder colors.
- `refined.js` — keyboard/focus behavior, opening and closing folders,
  theme persistence and interactive Component Lab.
- `README.md` — documentation.

No build, third-party fonts, external images or frameworks required.
