---
path: "/gatsby-react-helmet"
tags: ["GatsbyJS"]
date: 2019-06-11
title: Gatsbyでreact-helmetを使用しmetaタグを設定する
description: Gatsbyでmetaタグを設定する方法を紹介しています。gatsby-react-helmetというGatsbyでreact-helmetを導入するプラグインを使用して設定しています。
---

Gatsbyでmetaタグを設定するには`gatsby-react-helmet`というプラグインを使用するのが便利。`gatsby-react-helmet`とは`react-helmet`というReactでmetaタグを書き換えるモジュールをGatsbyに導入するためのプラグイン。

## モジュールのインストール
まずは`gatsby-plugin-react-helmet`をインストールして`gastby-config.js`に設定する。

```bash
npm i -S gatsby-plugin-react-helmet
```

```javascript
module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
  ]
}
```

## SEOコンポーネントを作成
metaタグを管理する為のコンポーネントを作成する。僕の場合、Gatsbyのスターターテーマである[gatsby-starter-default](https://github.com/gatsbyjs/gatsby-starter-default)をベースに作っている。このテーマ内に[SEOコンポーネント](https://github.com/gatsbyjs/gatsby-starter-default/blob/master/src/components/seo.js)というmetaタグを設定するコンポーネントが存在し`react-helmet`を導入済みため、特に変更する必要はなかったのでそのまま使用する。

2019/6当記事執筆時点では下記のようなコードとなっている。

```javascript
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, keywords, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `ja`,
  meta: [],
  keywords: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO
```

## ページコンポーネントへの設定
最後にmetaタグを設定したいページのコンポーネントに先ほど作成した`SEO`コンポーネントをインポートし、`title`と`description`属性にGraphQLで引っ張ってきたデータを渡してあげて完成。

記事ページなら下記のような感じ。

```javascript
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function BlogTemplate({
  data,
}) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark() {
      frontmatter {
        title
        description
      }
    }
  }
`
```

