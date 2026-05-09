import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  root: '.',
  base: '/daisyui-theme-amethyst/',
  build: {
    outDir: path.resolve(__dirname, '../../docs'),
    emptyOutDir: true,
  },
});
