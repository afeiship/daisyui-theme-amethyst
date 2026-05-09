# Amethyst DaisyUI Theme — Design Spec

> Package: `@jswork/daisyui-theme-amethyst`
> Repo: `https://github.com/afeiship/daisyui-theme-amethyst`
> Monorepo: pnpm workspaces

## Purpose

A DaisyUI custom theme inspired by amethyst crystals — deep indigo/purple palette with amber accent. Published to npm with three consumption formats: JS objects (v4), CSS @plugin (v5), and standalone CSS (CDN). Includes a showcase website built to `docs/` for GitHub Pages.

## Monorepo Structure

Managed via **pnpm workspaces** with two packages: the theme library and the showcase website.

```
daisyui-theme-amethyst/
├── package.json                    # root workspace config
├── pnpm-workspace.yaml
├── .gitignore
├── LICENSE
├── README.md
│
├── packages/
│   └── theme/                      # @jswork/daisyui-theme-amethyst
│       ├── package.json
│       ├── build.js                # pure Node.js build script
│       ├── src/
│       │   └── index.js            # v4 theme config objects
│       ├── themes/
│       │   ├── amethyst.css        # v5 CSS @plugin (light)
│       │   └── amethyst-dark.css   # v5 CSS @plugin (dark)
│       └── dist/                   # build output (gitignored)
│
├── apps/
│   └── website/                    # showcase site
│       ├── package.json
│       ├── index.html
│       ├── vite.config.js          # outputs to ../../docs/
│       └── src/
│           ├── main.js             # theme toggle logic
│           └── styles.css           # Tailwind + DaisyUI + local theme
│
└── docs/                           # website build output → GitHub Pages
```

### Workspace Config

**`pnpm-workspace.yaml`**:
```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

**Root `package.json`** scripts:
| Script | Purpose |
|--------|---------|
| `build` | Build all packages (`pnpm -r build`) |
| `dev` | Start website dev server |
| `website:build` | Build website to `docs/` |

**`packages/theme/package.json`** scripts:
| Script | Purpose |
|--------|---------|
| `build` | Run `build.js` to generate `dist/` |
| `prepublishOnly` | Auto-build before `npm publish` |

**`apps/website/package.json`** scripts:
| Script | Purpose |
|--------|---------|
| `dev` | `vite` |
| `build` | `vite build` (outputs to `../../docs/`) |

The website depends on the theme package via workspace reference: `"@jswork/daisyui-theme-amethyst": "workspace:*"`.

Build order: pnpm resolves topologically — `packages/theme` builds before `apps/website` because the website declares the workspace dependency. The root `build` script must run theme build first explicitly if needed: `pnpm --filter @jswork/daisyui-theme-amethyst build && pnpm --filter website build`.

## Theme Colors

Full token list per theme. Content tokens are derived for readability contrast against their parent color.

### Light (amethyst)

| Token | Color | Content Token | Content Color |
|-------|-------|---------------|---------------|
| primary | #6366f1 | primary-content | #ffffff |
| secondary | #a855f7 | secondary-content | #ffffff |
| accent | #f59e0b | accent-content | #1a1a1a |
| neutral | #374151 | neutral-content | #f9fafb |
| base-100 | #ffffff | base-content | #1f2937 |
| base-200 | #f3f4f6 | | |
| base-300 | #e5e7eb | | |
| info | #3b82f6 | info-content | #ffffff |
| success | #22c55e | success-content | #ffffff |
| warning | #eab308 | warning-content | #1a1a1a |
| error | #ef4444 | error-content | #ffffff |

### Dark (amethyst_dark)

| Token | Color | Content Token | Content Color |
|-------|-------|---------------|---------------|
| primary | #818cf8 | primary-content | #1e1b4b |
| secondary | #c084fc | secondary-content | #1e1b4b |
| accent | #fbbf24 | accent-content | #1a1a1a |
| neutral | #6b7280 | neutral-content | #f9fafb |
| base-100 | #1f2937 | base-content | #f3f4f6 |
| base-200 | #111827 | | |
| base-300 | #0f172a | | |
| info | #60a5fa | info-content | #1e3a5f |
| success | #4ade80 | success-content | #14532d |
| warning | #facc15 | warning-content | #422006 |
| error | #f87171 | error-content | #450a0a |

### Border & Animation Tokens (shared)

| Token | Value |
|-------|-------|
| --rounded-box | 0.75rem |
| --rounded-btn | 0.5rem |
| --rounded-badge | 1rem |
| --animation-btn | 0.2s |
| --animation-input | 0.2s |
| --btn-text-case | none |
| --btn-focus-scale | 0.97 |
| --border-btn | 1px |

## Output Formats

### Theme Name Mapping

| Format | Light | Dark |
|--------|-------|------|
| JS export name | `amethyst` | `amethyst_dark` |
| CSS filename | `amethyst.css` | `amethyst-dark.css` |
| `data-theme` value | `"amethyst"` | `"amethyst_dark"` |
| DaisyUI v5 name | `amethyst` | `amethyst_dark` |

### 1. JS Object (DaisyUI v4)

`src/index.js` exports `amethyst` and `amethyst_dark` as plain objects with hex colors and short variable names (`--p`, `--pc`, `--s`, `--sc`, `--a`, `--ac`, `--n`, `--nc`, `--b1`, `--b2`, `--b3`, `--bc`, `--in`, `--inc`, `--su`, `--suc`, `--wa`, `--wac`, `--er`, `--erc`). Build script generates `dist/index.js` (CJS) and `dist/index.mjs` (ESM).

### 2. CSS @plugin (DaisyUI v5)

`themes/amethyst.css` and `themes/amethyst-dark.css` use the `@plugin "daisyui/theme"` syntax with oklch color space. The oklch values are hand-crafted conversions from the hex colors above (see reference doc at `~/aric-notes/nextjs-ssg-notes/docs/publish-daisyui-theme.md` section 2 for the exact oklch values). Users import directly via `@import "daisyui-theme-amethyst/amethyst.css"`.

### 3. Standalone CSS (CDN)

`dist/amethyst.css` and `dist/amethyst-dark.css` contain `[data-theme="amethyst"]` and `[data-theme="amethyst_dark"]` selectors with hex variables (short names). Usable via `<link>` tag after DaisyUI core CSS.

## Showcase Website

- **Tech**: Vite + vanilla HTML + Tailwind CSS + DaisyUI
- **Purpose**: Preview all major DaisyUI components (buttons, cards, nav, forms, tables, modals, alerts, badges, etc.) in both light and dark themes
- **Build target**: `docs/` directory (root level)
- **Hosting**: GitHub Pages (serve from `docs/` folder)
- **Features**:
  - Theme toggle (light/dark)
  - All DaisyUI component categories represented
  - References theme package via workspace dependency

## npm Package Configuration

- **Name**: `@jswork/daisyui-theme-amethyst`
- **Files**: `dist/`, `themes/`
- **peerDependencies**: `daisyui >= 4`
- **License**: MIT
- **Exports map**:
```json
{
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./amethyst.css": "./themes/amethyst.css",
    "./amethyst-dark.css": "./themes/amethyst-dark.css"
  }
}
```

## Constraints

- No runtime dependencies for the theme package (build script is pure Node.js)
- Vite + Tailwind are devDependencies only (in `apps/website`)
- `docs/` is committed to git (GitHub Pages needs it)
- `dist/` is gitignored (built artifact)
- All packages use `"type": "module"` where applicable
