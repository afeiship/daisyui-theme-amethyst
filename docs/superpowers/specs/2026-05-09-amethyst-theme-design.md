# Amethyst DaisyUI Theme — Design Spec

> Package: `@jswork/daisyui-theme-amethyst`
> Repo: `https://github.com/afeiship/daisyui-theme-amethyst`

## Purpose

A DaisyUI custom theme inspired by amethyst crystals — deep indigo/purple palette with amber accent. Published to npm with three consumption formats: JS objects (v4), CSS @plugin (v5), and standalone CSS (CDN). Includes a showcase website built to `docs/` for GitHub Pages.

## Project Structure

```
daisyui-theme-amethyst/
├── package.json
├── README.md
├── LICENSE
├── build.js                  # npm package build script (pure Node.js)
├── src/
│   └── index.js              # v4 theme config objects
├── themes/
│   ├── amethyst.css          # v5 CSS @plugin (light)
│   └── amethyst-dark.css     # v5 CSS @plugin (dark)
├── website/                  # showcase site (Vite + vanilla HTML)
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.js           # theme toggle logic
│       └── styles.css        # imports Tailwind + DaisyUI + local theme
├── docs/                     # built website → GitHub Pages
├── dist/                     # built npm package artifacts
└── .gitignore
```

## Theme Colors

### Light (amethyst)

| Token | Color |
|-------|-------|
| primary | #6366f1 |
| secondary | #a855f7 |
| accent | #f59e0b |
| neutral | #374151 |
| base-100 | #ffffff |
| info | #3b82f6 |
| success | #22c55e |
| warning | #eab308 |
| error | #ef4444 |

### Dark (amethyst_dark)

| Token | Color |
|-------|-------|
| primary | #818cf8 |
| secondary | #c084fc |
| accent | #fbbf24 |
| neutral | #6b7280 |
| base-100 | #1f2937 |
| info | #60a5fa |
| success | #4ade80 |
| warning | #facc15 |
| error | #f87171 |

## Output Formats

### 1. JS Object (DaisyUI v4)

`src/index.js` exports `amethyst` and `amethyst_dark` as plain objects with hex colors and short variable names (`--p`, `--b1`, etc.). Build script generates `dist/index.js` (CJS) and `dist/index.mjs` (ESM).

### 2. CSS @plugin (DaisyUI v5)

`themes/amethyst.css` and `themes/amethyst-dark.css` use the `@plugin "daisyui/theme"` syntax with oklch color space. Users import directly via `@import "daisyui-theme-amethyst/amethyst.css"`.

### 3. Standalone CSS (CDN)

`dist/amethyst.css` and `dist/amethyst-dark.css` contain `[data-theme="amethyst"]` selectors with hex variables. Usable via `<link>` tag after DaisyUI core CSS.

## Showcase Website

- **Tech**: Vite + vanilla HTML + Tailwind CSS + DaisyUI
- **Purpose**: Preview all major DaisyUI components (buttons, cards, nav, forms, tables, modals, alerts, badges, etc.) in both light and dark themes
- **Build target**: `docs/` directory
- **Hosting**: GitHub Pages (serve from `docs/` folder)
- **Features**:
  - Theme toggle (light/dark)
  - All DaisyUI component categories represented
  - Imports local theme files (not from npm, uses relative paths during dev)

## npm Package Configuration

- **Name**: `@jswork/daisyui-theme-amethyst`
- **Exports**: JS (CJS + ESM), CSS files via subpath exports
- **Files**: `dist/`, `themes/`
- **peerDependencies**: `daisyui >= 4`
- **License**: MIT

## npm Scripts

| Script | Purpose |
|--------|---------|
| `build` | Build npm package to `dist/` via `build.js` |
| `website:dev` | Start Vite dev server for showcase |
| `website:build` | Build showcase to `docs/` |
| `prepublishOnly` | Auto-build before `npm publish` |

## Constraints

- No runtime dependencies for the npm package (build script is pure Node.js)
- Vite + Tailwind are devDependencies only (for the website)
- `docs/` is committed to git (GitHub Pages needs it)
- `dist/` is gitignored (built artifact)
