---
path: "/gatsby-styled-components"
tags: ["GatsbyJS", "Styled Components"]
date: 2019-04-11
modified: 2019-06-12
title: GatsbyにStyled Componentsを導入する
description: GatsbyでCSS in JSのライブラリの一つであるStyled Componentsを導入する方法を紹介しています。
---

CSS in JSを学ぶために数あるライブラリの中からデファクト感があるStyled Componentsを使ってみることにした。


## ライブラリの導入
Styled Componentsを導入するには下記のライブラリを導入する。

```shell
npm i -S gatsby-plugin-styled-components styled-components babel-plugin-styled-components
```

`gatsby-config.js`に下記の設定を追加。

```javascript
module.exports = {
  plugins: [`gatsby-plugin-styled-components`],
}
```

以上でStyled Componentsを使う土壌が整った。
あとはStyled Componentsを使いたいファイルで読み込んで下記のように記述する。

## JSファイルの記述

```javascript
import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components'

const MainWrapper = styled.div`
  margin: 0 auto;
  max-width: 720px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`

<MainWrapper>ここにテキストが入ります。</MainWrapper>
```

すると`<MainWrapper />`のところは下記のようなhtmlに変換・出力される。

```html
<div class="layout__MainWrapper-iozUyw cXFUyc">ここにテキストが入ります。</div>
```

`styled.`の後に指定したhtmlタグに変換され、classはユニークな値が自動付与される。
以上で導入が完了。
