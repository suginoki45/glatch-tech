---
path: "/hello-gatsbyjs"
date: 2019-04-01
title: HexoからGatsbyに移行した
---

当ブログはHexo製のブログをNetlifyにホスティングする形で運用していたが、最近Gatsby熱が個人的に高まっており、当ブログもHexoからGatsbyに乗り換えたのでメモ。

## Gastbyのインストール
まずはGastbyをコマンドラインから使用できるgatsby-cliをインストール。

```
npm i -g gatsby-cli
```

## ブログを作る
gatsby-cliがインストールできたら、gatsby newというコマンドでブログを生成。
gatsby newの後に続く文字列は任意の名前で好きに付けて構わない。ブログ名などにしておくと分かりやすい。

```
gatsby new my-blog
```

ブログが無事生成できたら以下のコマンドでブログを生成したディレクトリ内に移動

```
cd my-blog
```

以下のコマンドを実行するとブログが立ち上がる。

```
gatsby develop
```

すると下記のURLで確認ができる。

http://localhost:8000/

## ブログ名を変更する
デフォルトだと「Gatsby Starter Default」という名前になっていると思う。これを任意の名前に変更する。
ディレクトリ直下にある`gatsby-config.js`を編集する。
`siteMetadata`の`title`を変更すればブログ名が変わる。あわせて`description`と`author`も自分のブログに合わせて変更。

```
module.exports = {
  siteMetadata: {
    title: `Glatch Tech`,
    description: `Web制作ユニットGlatchのテックブログです。`,
    author: `Glatch`,
  }
}
```

## 記事の移行
Hexoではマークダウンで記事を書いていたので、今回はその資産をそのまま活用して、マークダウンファイルを表示できるようにした。ちなみに[雑記ブログ](https://suginoki45.netlify.com/)もGatsbyを使用しているが、そっちはContentfulに記事を置いている。

マークダウンの表示にあたっては公式のドキュメントが参考になる。ドキュメント通りに進んでいけば難なく実現可能だ。

こちらはGatsbyにマークダウンの記事を追加する方法。

[Adding Markdown Pages](https://www.gatsbyjs.org/docs/adding-markdown-pages/)

こちらは追加した記事を一覧で表示する方法。

[Adding a List of Markdown Blog Posts](https://www.gatsbyjs.org/docs/adding-a-list-of-markdown-blog-posts/)

## ここまで
以上でGatsbyでマークダウンの記事を表示させるところまでできた。