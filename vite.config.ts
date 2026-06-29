import { defineConfig } from 'vite';

export default defineConfig({
  build: {
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
