import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build` makes the deployable site in dist/.
// `npm run build:artifact` inlines the CSS and JS into one page for the claude.ai preview;
// media stays as separate files under media/.
export default defineConfig(({ mode }) => ({
  base: './',
  build: mode === 'artifact'
    ? { outDir: 'dist-artifact', emptyOutDir: true, cssCodeSplit: false }
    : { outDir: 'dist', emptyOutDir: true },
  plugins: mode === 'artifact' ? [viteSingleFile({ removeViteModuleLoader: true })] : [],
}));
