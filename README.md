# ToolyTools — Refined Neo-Brutalism

A **local demo-only** design system under `F:\Project\ToolyToolsStyleDemo`.
It does **not** modify the real https://toolytools.com website.

## Open

Double-click `index.html` in Edge/Chrome. No server, dependencies,
image packs, third-party fonts or build tools required.

Only **one design style** exists: Refined Neo-Brutalism — **Cool Slate** palette (clean cool white, muted slate blue, teal; no cream/orange).
Two modes, **Light** and **Dark**, share the exact same layout and components.

- Switch Light / Dark in the demo toolbar.
- Selected mode is stored in localStorage under `toolytools-refined-mode`.
- On first visit, the browser's system color preference is respected.
- The actual homepage preview keeps the original four categories in one row;
  on mobile all four folders appear in a 2×2 grid. The toolbar is demo-only.
- Click or tap any of the four folders to open a responsive modal with its tool cards.
- Close the folder with ×, Escape or the backdrop. Focus returns to the previous folder.
- Tool cards are a UI demo; they show a message rather than navigating to invented destinations.
- Below the homepage is a Component Lab with working form inputs, buttons,
  status badges, cards, sample result and tabs.
- Cookie actions are demonstration UI (not connected to real analytics).

## Files

- `index.html` — single clean demo + homepage + component specimens.
- `styles.css` — responsive homepage foundation,
  and component structure. Layout independent of color mode.
- `refined.css` — the single reusable visual system (Light & Dark).
- `refined.js` — appearance persistence, responsive folder dialog,
  keyboard/focus handling, cookie demo and interactive specimen.
- `interaction.css` — 2×2 folder layout and responsive dialog on desktop/mobile.
- `README.md` — this guide.

Keep `.git` and `.serena` for development/tool configuration.
No historical style packages, galleries, screenshots or ZIPs are required.

## Core tokens

Style tokens defined in `refined.css` on `html[data-mode="light"]`
and `html[data-mode="dark"]`:

| Token | Purpose |
| --- | --- |
| `--bg`, `--surface`, `--surface-2` | Page and card backgrounds |
| `--text`, `--muted` | Readable foreground colors |
| `--border`, `--shadow-ink` | 1.5px cool slate ink borders and subtle offset shadow |
| `--accent`, `--on-accent` | Primary action and contrast text |
| `--folder-1..4`, `--tile-1..8` | Four folders and eight tool tiles |
| `--radius-lg`, `--radius-md` | Corner sizes |
| `--shadow-card`, `--shadow-tile` | Shadows |
| `--ds-*` | Semantic aliases for use in future tool pages |

## Development roadmap

1. **Foundation:** refine contrast, radii, typography, elevation and spacing
   while retaining ToolyTools' homepage structure.
2. **Interactive components:** formalize Button, Input, Select, Tabs, Toast,
   Dialog, Preview Panel and accessibility states.
3. **First real tool migration:** test the system on Workout Wallpaper Generator,
   including mobile layout and Light/Dark controls.
4. **Cross-tool adoption:** reuse tokens and components in future GPX, fitness,
   calculator and developer tools.

No production changes are performed by this demo.
