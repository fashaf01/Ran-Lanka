import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { viteSingleFile } from 'vite-plugin-singlefile';

const GOOGLE_FONTS = 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500..600&family=Noto+Serif+Display:ital,wdth,wght@0,87.5..100,300..400;1,87.5..100,400..500&family=Cormorant+Garamond:ital,wght@0,400..600;1,400..500&family=Noto+Serif+Sinhala:wght@500&display=swap';

// The artifact host only allows fonts from Google Fonts, so that build links them instead of
// bundling the self-hosted files.
const remoteFonts = {
  name: 'remote-fonts',
  transformIndexHtml(html) {
    return html
      .replace(/<link rel="preload" as="font"[^>]*>\n?/g, '')
      .replace('</title>', `</title>\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="${GOOGLE_FONTS}">`);
  },
};

export default defineConfig(({ mode }) => {
  const artifact = mode === 'artifact';
  return {
    base: './',
    resolve: artifact ? { alias: [{ find: /^\.\/styles\/fonts\.css$/, replacement: fileURLToPath(new URL('./src/styles/fonts-remote.css', import.meta.url)) }] } : {},
    build: artifact ? { outDir: 'dist-artifact', emptyOutDir: true, cssCodeSplit: false } : { outDir: 'dist', emptyOutDir: true },
    plugins: artifact ? [remoteFonts, viteSingleFile({ removeViteModuleLoader: true })] : [],
  };
});
