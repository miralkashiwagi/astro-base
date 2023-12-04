
# 🚀 Project Structure


```
/
├── public/ 画像やビルドしないファイル
├── src/
│   ├── _inc/　共通パーツ
│   ├── js/ ビルドするJS
│   ├── pages/ ページごとのAstro
│   └── scss/ ビルドするSCSS
└── package.json
```


# CSS設計方針

https://zenn.dev/kagan/articles/css-alphabetical-layers-css
- Abstracts:変数・関数・mixinなど。これ自体をビルドしても何も出力されないこと
- Base: リセットCSSや、要素セレクタを使用した基本的なスタイル。全称セレクタ、要素セレクタ、擬似クラスセレクタなど、ユーザーが定義していないセレクタにたいするスタイル。
- Components: サイト上のパーツのスタイル。サイト内共通パーツ全般。buttonもheaderも。
- Features: 全ページ共通とまではいかない、特定の役割をもったパーツ（/product/下層共通パーツとか）
- Pages: 特定のページで必要になるスタイル。/about/ページのためだけに書いたスタイルとか
  - ページスラッグが名前空間になるので、`p-` は不要
- Utilities: `u-text-center`みたいなものだけを定義。このレイヤーのみ !important の使用を許可。

※LPの場合、CとFを使わずにPのみで構築することも可。 
Componentsに分類される要素ではmarginをつけることを避ける 
Features, Pagesに分類される要素ではmarginをつけることを許容する 

----

