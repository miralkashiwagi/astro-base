
## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |


----

https://zenn.dev/kagan/articles/css-alphabetical-layers-css
Abstracts:変数・関数・mixinなど。これ自体をビルドしても何も出力されないこと
Base: リセットCSSや、要素セレクタを使用した基本的なスタイル。全称セレクタ、要素セレクタ、擬似クラスセレクタなど、ユーザーが定義していないセレクタにたいするスタイル。
Components: サイト上のパーツのスタイル。サイト内共通パーツ全般。buttonもheaderも。
Features: 全ページ共通とまではいかない、特定の役割をもったパーツ（/product/下層共通パーツとか）
Pages: 特定のページで必要になるスタイル。/about/ページのためだけに書いたスタイルとか
Utilities: `u-text-center`みたいなものだけを定義。このレイヤーのみ !important の使用を許可。

※LPの場合、CとFを使わずにPのみで構築することも可。
Componentsに分類される要素ではmarginをつけることを避ける
Features, Pagesに分類される要素ではmarginをつけることを許容する