---
path: "/gatsby-tag"
tags: ["GatsbyJS"]
date: 2019-04-23
title: Gatsbyにタグ機能を実装する
---

Gatsbyでタグの機能を実装した。タグ機能の実装にあたってはGatsby公式ドキュメントの[Creating Tags Pages for Blog Posts](https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/)を参考にした。

 ## 前提条件
- 記事はマークダウンで管理

## マークダウンファイルにタグを追加
まずはマークダウンにタグを追加する。このタグをGraphQLで引っ張って表示させる。

```
---
path: "/gatsby-prismjs"
date: 2019-04-19
title: GatsbyにシンタックスハイライターのPrism.jsを導入する
---
```

以下のようにJavaScriptの配列型で追加。複数ある場合はカンマ区切りで。

```
---
path: "/gatsby-prismjs"
tags: ["GatsbyJS", "PrismJS"]
date: 2019-04-19
title: GatsbyにシンタックスハイライターのPrism.jsを導入する
---
```

## タグページのテンプレートを作成
次に該当のタグが付与されている記事を一覧表示するテンプレートを作成する。
`src/templates`以下にファイルを作成し、[公式ドキュメント](https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/)を少しカスタマイズして使用。

```javascript
import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges } = data.allMarkdownRemark
  const tagHeader = `「${tag}」タグのついた記事一覧`

  return (
    <Layout>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { path, title } = node.frontmatter
          return (
            <li key={path}>
              <Link to={path}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
          }
        }
      }
    }
  }
`

```

## `gatsby-node.js`の編集
続いて`gatsby-node.js`に`createPages`を使用して`src/templates/tags.js`の内容をレンダリングする。

```javascript
const path = require("path")
const _ = require("lodash")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`src/templates/post.js`)
  const tagTemplate = path.resolve(`src/templates/tags.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    // Create post detail pages
    posts.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
        context: {}, // additional data can be passed via context
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      })
    })
  })
}
```

## タグ一覧ページを作成する
タグページができたら次はタグページの一覧を表示するインデックスページを作る。

`src/pages/`以下にJSファイルを作成し、下記のように記述。


```javascript
import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <div>
    <Helmet title={`タグ一覧 - ${title}`} />
    <Layout>
      <h1>タグ一覧</h1>
      <ul>
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  </div>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
```

コード中にある`propTypes`とはPropsのデータ型を定義するためのライブラリ。なくても動作するがたとえ一人運用でも未来の自分に向けて導入するのはあり。

[「prop-types」でPropsのデータ型を担保する (1/3)：CodeZine（コードジン）](https://codezine.jp/article/detail/10729)

以上でタグページ、タグ一覧ページの2ページが作成できた。