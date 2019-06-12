---
path: "/gatsby-typographyjs"
tags: ["GatsbyJS"]
date: 2019-04-07
modified: 2019-06-12
title: Gatsbyでフォント関連のスタイルの設定をする
description: GatsbyでTypography.jsというライブラリを使用して、フォント関連のスタイルを設定する紹介しています。
---

Gatsbyでフォント関連の指定を行うには、公式ドキュメントにはTypography.jsというライブラリを使用する方法が紹介されているので、そちらの方法で設定をする。

[Typography.js | GatsbyJS](https://www.gatsbyjs.org/docs/typography-js/)

[Typography.js](http://kyleamathews.github.io/typography.js/)

## 関連プラグインをインストール
Typography.jsに加えて`gatsby-plugin-typography`と`react-typography`をインストールする。

```shell
npm i  -S gatsby-plugin-typography react-typography typography
```

インストールが終わったら`gatsby-config.js`の`plugins`に以下の記述を追加する。

```javascript
plugins: [
  {
    resolve: `gatsby-plugin-typography`,
    options: {
      pathToConfigModule: `src/utils/typography`,
    }
  }
]
```

これでGatsbyへ設定を反映させる準備が整った。次に設定ファイルを作っていく。

## Tyypographyの設定を作成

先ほど`gatsby-config.js`の`pathToConfigModule`に設定した場所に設定した名前のJSファイルを作成する。

```javascript
import Typography from "typography"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.75,
  bodyFontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Helvetica Neue",
    "游ゴシック体",
    “Yugothic",
    "游ゴシック",
    "Yu Gothic",
    "Verdana",
    "メイリオ",
    "sans-serif",
  ],
})

export default typography
```

以上で設定は完了。

## ハマったところ
`src/components/layout.css`に記述されていたスタイルに打ち消されて設定が反映されなかった。
`layout.css`のスタイルの打ち消してしまっているスタイルを削除して無事反映された。