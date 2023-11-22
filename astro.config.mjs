import { defineConfig } from 'astro/config';

// https://zenn.dev/ixkaito/articles/astro-relative-links
import relativeLinks from 'astro-relative-links';

export default defineConfig({
  integrations: [relativeLinks()],

  vite: {
    build: {
      minify: false,
      rollupOptions: {
        output: {
          //https://cumak.net/blog/astro/ cssのファイル名をわかりやすいものに
          assetFileNames: 'assets/[ext]/[name][extname]',
          entryFileNames: 'assets/js/scripts.js'
        }
      }
    }
  }
});
