---
path: "/gatsby-table-of-contents"
tags: ["GatsbyJS"]
date: 2021-12-01
modified: null
title: Gatsbyに目次を追加する
description: Gatsbyで制作したMarkdownブログに目次を追加する手順をご紹介します。
---

こんにちは！フロントエンドエンジニア・テクニカルライターのスギ（[@suginoki45](https://twitter.com/suginoki45)）です。
今回はGatsbyで制作したブログに目次を追加したので、備忘録も兼ねてご紹介します。

## 前提条件
- コンテンツはMarkdownで管理

## 必要なプラグイン
今回使用するプラグインは以下の2つです。

- [gatsby-transformer-remark](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/)  
Markdownをパースしてくれるプラグイン
- [gatsby-remark-autolink-header](https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/)  
見出しにリンクを追加してくれるプラグイン

## プラグインの設定
`gatsby-config.js`にプラグインを設定します。Markdownで制作している方は`gatsby-transformer-remark`は既に設定済みだと思いますので、新たに追加するのは`gatsby-remark-autolink-header`のみかと思います。`gatsby-remark-autolink-header`は`gatsby-transformer-remark`のサブプラグインなので、以下のように設定します。オプションについては[公式ドキュメント](https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/) を参照してください。

```js:title=gatsby-config.js
{
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-autolink-headers`,
        {
          resolve: `gatsby-remark-code-titles`,
          options: {
            className: 'gatsby-remark-code-title',
          },
        },
      ],
    },
}
```

## 目次コンポーネントの作成
目次を表示させるためのコンポーネントを用意します。マークアップについてはお好みで。

```jsx:title=src/components/TOC/index.js
import React from "react"

const TOC = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
export default TOC
```

## テンプレートファイルに目次コンポーネントとGraphQLのフィールドに`tableOfContents`を追加
作成した目次コンポーネントをブログの任意の場所に追加しましょう。

目次コンポーネントに渡すデータとなるGraphQLのフィールドに`tableOfContents`を追加することも忘れずに。`tableOfContents`には記事の見出しの情報が`<ul><li></li></ul>`でマークアップされた形で取得できます。

```jsx{5,18,32-34}:title=src/pages/{Field.Slug}.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import TOC from "../components/TOC"

const BlogPostTemplate = ({ params, data }) => {
  return (
    <Layout>
      <SEO
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description}
      />
      <article className={styles.post}>
        <h1 className={styles.postTitle}>
          {data.markdownRemark.frontmatter.title}
        </h1>
        <TOC html={data.markdownRemark.tableOfContents} />
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      tableOfContents(
        absolute: false
      )
      frontmatter {
        title
        description
        date(formatString: "公開日：YYYY年MM月DD日")
        modified(formatString: "更新日：YYYY年MM月DD日")
        tags
      }
    }
  }
`
```

作業は以上です。あとは目次が問題なく追加・機能しているかを確認して完成です。

## おわりに
やはり目次があると読み返すのに便利ですね。特に技術ブログという特性上、何度も行ったり来たりするので読みやすくなったかなと思います。