import { defineConfig } from 'astro/config';
// https://zenn.dev/ixkaito/articles/astro-relative-links
import relativeLinks from 'astro-relative-links';
// import compress from "astro-compress";
import htmlBeautifier from "astro-html-beautifier";

// https://astro.build/config
export default defineConfig({
  //開発時の末尾のスラッシュの挙動を一貫させるため、常に末尾にスラッシュを追加する
  trailingSlash: 'always',

  server: {port: 3000},

  //HTMLの圧縮を無効化
  compressHTML: false,

  build: {
    inlineStylesheets: `never`,
  },
  integrations: [

    //相対リンクを有効化
    relativeLinks(),

    //圧縮設定
    // compress({
    //   CSS: false,
    //   HTML: false,
    //   Image: false,
    //   JavaScript: true,
    //   SVG: false,
    // }),
    htmlBeautifier()],

  vite: {
    build: {
      minify: false,
      rollupOptions: {
        output: {
          //https://cumak.net/blog/astro/ cssのファイル名をわかりやすいものに

          assetFileNames: assetInfo => {
            if(assetInfo.name === 'index.css') {
              return `assets/css/style.css`;
            }
            return `assets/[ext]/[name][extname]`;
          },

          entryFileNames: entryInfo => {
            //entryInfo.moduleIdsの中に、srcの文字列を含むものがあったら
            if(entryInfo.moduleIds.some(moduleId => moduleId.includes('src'))) {
              //entryInfo.moduleIdsの中から、srcとastroを含むものを取得
              let filePath = entryInfo.moduleIds.find(moduleId => moduleId.includes('src') && moduleId.includes('.astro'));
              if(filePath === undefined) {
                return `assets/js/bundle.js`;
              }
              let parts = filePath.split('/');
              let fullName = parts[parts.length - 1].split('?')[0];
              let newFileName = fullName.split('.astro')[0];

              //取得したファイル名を元に、ファイル名を変更
              return `assets/js/${newFileName}.js`;
            }
            return `assets/js/[name].js`;
          },
        }
      }
    }
  }
});