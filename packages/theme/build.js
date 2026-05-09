import fs from 'fs';
import path from 'path';
import { amethyst, amethyst_dark } from './src/index.js';

const distDir = path.resolve('dist');
fs.mkdirSync(distDir, { recursive: true });

// ESM
fs.writeFileSync(
  path.join(distDir, 'index.mjs'),
  `export const amethyst = ${JSON.stringify(amethyst, null, 2)};\n\nexport const amethyst_dark = ${JSON.stringify(amethyst_dark, null, 2)};\n`
);

// CJS
fs.writeFileSync(
  path.join(distDir, 'index.js'),
  `'use strict';\nconst amethyst = ${JSON.stringify(amethyst, null, 2)};\n\nconst amethyst_dark = ${JSON.stringify(amethyst_dark, null, 2)};\n\nmodule.exports = { amethyst, amethyst_dark };\n`
);

// Short variable name mapping for DaisyUI v4 CDN CSS
const varMap = {
  'primary': '--p',
  'primary-content': '--pc',
  'secondary': '--s',
  'secondary-content': '--sc',
  'accent': '--a',
  'accent-content': '--ac',
  'neutral': '--n',
  'neutral-content': '--nc',
  'base-100': '--b1',
  'base-200': '--b2',
  'base-300': '--b3',
  'base-content': '--bc',
  'info': '--in',
  'info-content': '--inc',
  'success': '--su',
  'success-content': '--suc',
  'warning': '--wa',
  'warning-content': '--wac',
  'error': '--er',
  'error-content': '--erc',
};

function generateCDNCSS(name, theme, colorScheme) {
  const selector = `:root:has(input.theme-controller[value="${name}"]:checked),\n[data-theme="${name}"]`;
  const vars = Object.entries(theme)
    .map(([key, value]) => {
      const varName = varMap[key] || (key.startsWith('--') ? key : null);
      if (!varName) return null;
      return `  ${varName}: ${value};`;
    })
    .filter(Boolean)
    .join('\n');

  return `/* ${name} — Amethyst DaisyUI theme */\n${selector} {\n  color-scheme: ${colorScheme};\n${vars}\n}\n`;
}

fs.writeFileSync(
  path.join(distDir, 'amethyst.css'),
  generateCDNCSS('amethyst', amethyst, 'light')
);

fs.writeFileSync(
  path.join(distDir, 'amethyst-dark.css'),
  generateCDNCSS('amethyst_dark', amethyst_dark, 'dark')
);

console.log('Build complete:');
for (const f of fs.readdirSync(distDir)) {
  console.log(`  dist/${f}`);
}
