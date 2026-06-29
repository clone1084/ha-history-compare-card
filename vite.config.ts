import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2020',
    lib: {
      entry: 'src/history-compare-card.ts',
      formats: ['es'],
      fileName: () => 'history-compare-card.js',
    },
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
  },
});
