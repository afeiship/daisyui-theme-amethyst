# Amethyst — DaisyUI Theme

A deep indigo/purple DaisyUI theme inspired by amethyst crystals, with an amber accent for warmth.

## Install

```bash
npm install @jswork/daisyui-theme-amethyst
```

## Usage

### DaisyUI v5 (Tailwind CSS v4)

```css
@import "tailwindcss";
@plugin "daisyui";
@import "@jswork/daisyui-theme-amethyst/amethyst.css";
@import "@jswork/daisyui-theme-amethyst/amethyst-dark.css";
```

### DaisyUI v4 (JS config)

```js
import { amethyst, amethyst_dark } from '@jswork/daisyui-theme-amethyst';

export default {
  plugins: [require("daisyui")],
  daisyui: {
    themes: [amethyst, amethyst_dark],
  },
};
```

### CDN (standalone CSS)

```html
<link rel="stylesheet" href="https://unpkg.com/@jswork/daisyui-theme-amethyst/dist/amethyst.css" />
<link rel="stylesheet" href="https://unpkg.com/@jswork/daisyui-theme-amethyst/dist/amethyst-dark.css" />
```

## Theme Colors

| Token      | Light                    | Dark                     |
|------------|--------------------------|--------------------------|
| primary    | Deep Indigo `#6366f1`    | Light Indigo `#818cf8`   |
| secondary  | Purple `#a855f7`         | Light Purple `#c084fc`   |
| accent     | Amber `#f59e0b`          | Amber `#fbbf24`          |
| neutral    | Slate `#475569`          | Cool Gray `#6b7280`      |
| base-100   | White `#ffffff`          | Dark Slate `#1f2937`     |
| info       | Blue-Indigo `#4f46e5`    | Blue-Indigo `#6366f1`    |
| success    | Emerald `#10b981`        | Emerald `#34d399`        |
| warning    | Amber `#f59e0b`          | Amber `#fbbf24`          |
| error      | Rose `#ef4444`           | Rose `#f87171`           |

## Dark Mode

Toggle via `data-theme` attribute:

```html
<html data-theme="amethyst">       <!-- light -->
<html data-theme="amethyst_dark">  <!-- dark -->
```

Or use a DaisyUI theme controller:

```html
<input type="checkbox" class="theme-controller" value="amethyst_dark" />
```

## License

MIT
