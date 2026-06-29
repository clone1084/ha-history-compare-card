import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2020',
    lib: {
      entry: 'src/history-compare-card.ts',
      formats: ['es'],
      fileName: () => 'history-compare-card.js',
    },
    rollupOptions: {
      external: [],
      output: {
        inlineDynamicImports: true,
      },
    },
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ['lit', 'lit/decorators.js', 'chart.js', 'custom-card-helpers'],
  },
});
