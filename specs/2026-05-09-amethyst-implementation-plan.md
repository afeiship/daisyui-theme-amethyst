# Amethyst Theme — Implementation Plan

**Spec:** `specs/2026-05-09-amethyst-theme-design.md`

## Summary

| Metric | Value |
|--------|-------|
| **Total Steps** | 9 |
| **Execution Waves** | 3 |
| **Key Dependencies** | pnpm, Tailwind CSS v4, DaisyUI v5 |

---

## Wave 1: Project Scaffolding + Theme Source (no external deps)

These steps have zero dependencies and can be done in parallel.

| # | Step | Files | Description |
|---|------|-------|-------------|
| 1 | Root workspace config | `package.json`, `pnpm-workspace.yaml`, `.gitignore`, `LICENSE` | Set up monorepo root with pnpm workspaces |
| 2 | Theme package scaffold | `packages/theme/package.json` | Package config with exports map, peerDeps, scripts |
| 3 | v4 theme source | `packages/theme/src/index.js` | JS objects with full color tokens (hex + short vars) |
| 4 | v5 CSS themes | `packages/theme/themes/amethyst.css`, `packages/theme/themes/amethyst-dark.css` | CSS @plugin format with oklch values |
| 5 | Build script | `packages/theme/build.js` | Pure Node.js: generates CJS, ESM, standalone CSS to dist/ |

---

## Wave 2: Website App (depends on Wave 1)

Requires theme package to exist for workspace dependency resolution.

| # | Step | Files | Description |
|---|------|-------|-------------|
| 6 | Website scaffold | `apps/website/package.json`, `apps/website/vite.config.js`, `apps/website/src/styles.css` | Vite + Tailwind + DaisyUI setup, outputs to `../../docs/` |
| 7 | Website page | `apps/website/index.html`, `apps/website/src/main.js` | Showcase page with all DaisyUI components + theme toggle |

---

## Wave 3: Polish & Build (depends on Wave 2)

| # | Step | Files | Description |
|---|------|-------|-------------|
| 8 | README | `README.md` | Install, usage (v4/v5/CDN), theme colors table, preview |
| 9 | Build & verify | `docs/`, `dist/` | Run `pnpm build`, verify all outputs, commit |

---

## Detailed Steps

### Step 1: Root workspace config

**Files to modify:**
- `package.json` — rewrite to workspace root
- `pnpm-workspace.yaml` — new file
- `.gitignore` — add `dist/`, `node_modules/`, remove irrelevant entries
- `LICENSE` — new MIT license file

### Step 2: Theme package scaffold

**Files to create:**
- `packages/theme/package.json`

Key fields:
```json
{
  "name": "@jswork/daisyui-theme-amethyst",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "exports": {
    ".": { "import": "./dist/index.mjs", "require": "./dist/index.js" },
    "./amethyst.css": "./themes/amethyst.css",
    "./amethyst-dark.css": "./themes/amethyst-dark.css"
  },
  "files": ["dist", "themes"],
  "peerDependencies": { "daisyui": ">=4" },
  "scripts": {
    "build": "node build.js",
    "prepublishOnly": "npm run build"
  }
}
```

### Step 3: v4 theme source

**File:** `packages/theme/src/index.js`

Export `amethyst` and `amethyst_dark` objects with all tokens from spec color tables (hex values, short variable names `--p`/`--pc`/`--s`/`--sc`/etc.).

### Step 4: v5 CSS themes

**Files:** `packages/theme/themes/amethyst.css`, `packages/theme/themes/amethyst-dark.css`

Use `@plugin "daisyui/theme"` syntax with oklch values from reference doc.

### Step 5: Build script

**File:** `packages/theme/build.js`

Pure Node.js script that:
1. Imports from `src/index.js`
2. Writes `dist/index.mjs` (ESM)
3. Writes `dist/index.js` (CJS)
4. Writes `dist/amethyst.css` (standalone CDN CSS with `[data-theme]` selectors)
5. Writes `dist/amethyst-dark.css` (standalone CDN CSS)

### Step 6: Website scaffold

**Files to create:**
- `apps/website/package.json` — deps: vite, tailwindcss, @tailwindcss/vite, daisyui, workspace ref to theme
- `apps/website/vite.config.js` — output to `../../docs/`
- `apps/website/src/styles.css` — `@import "tailwindcss"`, `@plugin "daisyui"`, import theme CSS

### Step 7: Website page

**Files to create:**
- `apps/website/index.html` — full showcase page with all DaisyUI components
- `apps/website/src/main.js` — theme toggle logic (light/dark switch)

Component sections to include: buttons, alert, badge, card, navbar, drawer, modal, table, form elements (input, select, checkbox, radio, toggle), progress, stats, hero, footer.

### Step 8: README

**File:** `README.md`

Sections: description, install, usage (v4, v5, CDN), theme colors table, license.

### Step 9: Build & verify

Run `pnpm install && pnpm build`, check that `dist/` and `docs/` contain expected files.
