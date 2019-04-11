---
path: "/getting-start-styled-components-with-gatsby"
date: 2019-04-11
title: GatsbyにStyled Componentsを導入する
---

CSS in JSを学ぶために数あるライブラリの中からデファクト感があるStyled Componentsを使ってみることにした。


## ライブラリの導入
Styled Componentsを導入するには下記のライブラリを導入する。

```
npm i -S gatsby-plugin-styled-components styled-components babel-plugin-styled-components
```

`gatsby-config.js`に下記の設定を追加。

```
module.exports = {
  plugins: [`gatsby-plugin-styled-components`],
}
```

以上でStyled Componentsを使う土壌が整った。
あとはStyled Componentsを使いたいファイルで読み込んで下記のように記述する。

## JSファイルの記述

```
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

```
<div class="layout__MainWrapper-iozUyw cXFUyc">ここにテキストが入ります。</div>
```

`styled.`の後に指定したhtmlタグに変換され、classはユニークな値が自動付与される。
以上で導入が完了。
