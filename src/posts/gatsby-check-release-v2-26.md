---
path: "/gatsby-check-release-v2-26"
tags: ["GatsbyJS"]
date: 2021-11-15
modified: null
title: Gatsby v2.26のアップデートを確認する
description: Gatsby v2.26のアップデートの内容を確認しました。その中でも特に興味深かったFile System Route APIとgatsby-plugin-imageについて深掘りして紹介しています。
---

今更すぎるのですが、先日Gatsbyをv2.26にアップデートするにあたり、変更点を確認したので自身の理解のためにも記事に残しておきます。変更点の全容は[公式のリリースノート](https://www.gatsbyjs.com/docs/reference/release-notes/v2.26/)をご確認ください。

今回はその中でも特に気になった以下のアップデートについて書いておきたいと思います。

- File System Route API
- gatsby-plugin-image

## File System Route API
File System Route APIは同レイアウトでコンテンツが異なるページの生成が簡単にできるAPIです。代表的な例としてブログ記事を思い浮かべるとわかりやすいかなと思います。Next.jsやNuxt.jsなどのフレームワークではお馴染みの機能ですが、Gatsbyでも同様の機能が搭載されました。

これまでは`gatsby-node.js`で`createPages`APIを使用して生成していましたが、File System Route APIは命名規則に則ったファイル名を設定することで、`createPages`APIを内部的に呼び出し、抽象化を実現したとのことです。

[Announcing Gatsby’s new File System Route API](https://www.gatsbyjs.com/blog/fs-route-api/)

### File System Route API以前のページ生成方法
File System Route API以前の同レイアウトのページの生成方法は、`gatsby-node.js`で`createPages`APIを使用してGraphQLのクエリからデータを取得していました。

例としてマークダウンからコンテンツを取得してページを生成する方法を以下に記します。

```js:title=gatsby-node.js
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const postTemplate = path.resolve(`src/templates/post.js`)

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
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
        context: {},
      })
    })
  })
}
```

そして`createPage`APIの`component`オプションでデータの挿入先として設定したテンプレートには以下のように記述します。

```jsx:title=src/templates/post.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

export default function BlogTemplate({
  data,
}) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <div>
        <article>
          <h1>{frontmatter.title}</h1>
          <ul>
            <li>
              <time>{frontmatter.date}</time>
            </li>
            <li>
              <time>{frontmatter.modified}</time>
            </li>
          </ul>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "公開日：YYYY年MM月DD日")
        modified(formatString: "更新日：YYYY年MM月DD日")
        path
        title
        tags
        description
      }
    }
  }
`
```

このようにNext.jsやNuxt.jsと比較すると、自分で生成の処理を書かなければならない点がやや面倒でした。その点を解決するのが今回搭載されたFile System Route APIです。

### File System Route APIのページ生成方法
File System Route APIのページ生成方法は`gatsby-node.js`に自前で書いていたページ生成の処理が不要になるので削除します。次にテンプレートとなるファイルのファイル名を`{Schema.Filed}`の形で記述し、取得したいコンテンツを指定します。

その上でこれまで`templates`配下に設置していたテンプレートファイルを`pages`配下に移動することで実現可能となります。マークダウンからコンテンツを取得している私の環境の場合、ファイル名は`{MarkdownRemark.frontmatter__path}.js`となります。

```jsx:title=src/pages/{MarkdownRemark.frontmatter__path}.js
import React from "react"
import { graphql } from "gatsby"
import styles from "./post.module.css"

const BlogPostTemplate = ({ params, data }) => {
  return (
    <article className={styles.post}>
      <h1 className={styles.postTitle}>{data.markdownRemark.frontmatter.title}</h1>
      <ul className={styles.postDateList}>
        <li className={styles.postDateListItem}>
          <time className={styles.postDate}>{data.markdownRemark.frontmatter.date}</time>
        </li>
        <li className={styles.postDateListItem}>
          <time className={styles.postDate}>{data.markdownRemark.frontmatter.modified}</time>
        </li>
      </ul>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </article>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
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

これだけでOKです。

## gatsby-plugin-image
`gatsby-plugin-image`は`gatsby-image`に代わる画像処理を行う新しいプラグインです。画像の取り回しの難しさはGatsbyの弱点の一つでしたが、その点を解消しているプラグインになっていると思いました。

`gatsby-plugin-image`には静的画像用の`StaticImage`と動的画像用の`GatsbyImage`の2つのコンポーネントがあります。

### `StaticImage`
静的画像を表示させたい場合に使用するコンポーネントです。静的画像というとややこしいですが、レンダリング時に毎回同じ画像を表示させたい場合は`StaticImage`を使用するというイメージで良さそうです。

従来の`gatsby-image`だと例え`src`ディレクトリに保存していた画像でもGraphQLを介さないと使用できませんでした。しかし`StaticImage`を使えばGraphQLを介さずに相対パスで読み込む形で画像の使用が可能となります。プレーンなHTMLの`<img />`と同じような使用感ですね。

```jsx
import React from "react"
import { StaticImage } from "gatsby-plugin-image"

export const Sample = () => (
  <StaticImage width={100} height={100} src="./images/sample.png" alt="sample" />
)
```

### `GatsbyImage`
`GatsbyImage`は従来の`gatsby-image`の似た仕様でGraphQLを介して画像を表示させます。`StaticImage`に対して`GatsbyImage`は動的画像を表示させる際に使用します。

また大きな変更点として`gatsby-image`の時には下記のように`fixed`と`fluid`クエリに複数のフラグメントが用意されており、やや面倒でした。

```jsx
import { graphql } from "gatsby"
export const query = graphql`
  {
    file(relativePath: { eq: "images/example.jpg" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
```

この点、`gatsby-plugin-image`では`gatsbyImageData`という一つのフラグメントに集約され、ここにリゾルバーを渡す形に変更となり、よりシンプルな記述となりました。

```jsx
import { graphql } from "gatsby"
export const query = graphql`
  {
    file(relativePath: { eq: "images/example.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }
  }
`
```

`gatsby-image`から`gatsby-plugin-image`への移行は公式のドキュメントに目を通すことをおすすめします。

[Migrating from gatsby-image to gatsby-plugin-image](https://www.gatsbyjs.com/docs/reference/release-notes/image-migration-guide/)

## おわりに
今回のアップデートでGastbyを使用していて点が解消され、さらに使いやすくなった印象です。特に画像が扱いやすくなった点が個人的に大きいな変更でしたね。