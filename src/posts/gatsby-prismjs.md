---
path: "/gatsby-prismjs"
date: 2019-04-19
title: GatsbyにシンタックスハイライターのPrism.jsを導入する
---

Gatsbyでソースコードを美しく表示してくれるシンタックスハイライターを導入した。今回は公式ドキュメントでも紹介されているPrismJSを導入した。

## プラグインのインストール
PrismJSとGatsby用のプラグインのgatsby-remark-prismjsの二つをインストールする。

```shell
npm i -S prisms gatsby-remark-prismjs
```

## プラグインの追加
```javascript
plugins: [
	{
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          }
        ]
      }
    }
]
```

## テーマの設定
`gatsby-browser.js`にPrismJSのテーマの設定を追加する。
テーマは[https://prismjs.com/](公式サイト)から好きなものを選べば良い。

```javascript
require("prismjs/themes/prism-twilight.css")
```

以上でコードが美しく表示できるようになる。