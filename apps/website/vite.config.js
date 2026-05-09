import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  root: '.',
  build: {
    outDir: path.resolve(__dirname, '../../docs'),
    emptyOutDir: true,
  },
});
