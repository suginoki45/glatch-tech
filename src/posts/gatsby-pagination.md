---
path: "/gatsby-pagination"
tags: ["GatsbyJS"]
date: 2019-05-15
modified: 2019-06-11
title: Gatsbyにページネーションを実装する
description: Gatsbyでgatsby-awesome-paginationというプラグインを使用してページネーションを実装する方法を紹介しています。
---

Gatsbyでページネーションを追加したのでメモ。
ページネーションを追加するプラグインはいくつかあったけど、今回は`gatsby-awesome-pagination`を使用した。

実装にあたって下記の記事を参考にさせていただきました。有益な記事をありがとうございました。

[gatsby-awesome-paginationでGatsbyにpaginationをつけた](https://terrier.dev/blog/2019/20190306231739-gatsby-awesome-pagination-gatsby-pagination/)

## 1. プラグインのインストール
```javascript
npm i -S gatsby-awesome-pagination
```

## 2. `gatsby-node.js`の設定
つづいて`gatsby-node.js`にページネーションのビルド設定を追加する。以下該当部分を抜粋。

```javascript
// プラグインの読み込み
const path = require("path")
const { paginate } = require("gatsby-awesome-pagination")

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions

	// ページネーション関数buildPaginationを作成
	const buildPagination = posts => {
		paginate({
			createPage,
			items: posts,
			itemsPerPage: 10,
			// 2ページ目以降はURLに"/page"が付与されるよう設定
			pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? "/" : "/page"),
			component: path.resolve('src/templates/index.js')
		})
	}

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

			// buildPagination関数の実行
			buildPagination(posts)
		})
	})
}
```

## 3. ページネーションコンポーネントの作成
次はページネーションのコンポーネントを作成する。

### src/components/Pagination.js
```javascript
import { Link } from "gatsby"
import React from "react"
import styles from "./Pagination.module.css"

const Pagination = ({ props }) => {
	const { pageContext } = props;
	const { previousPagePath, nextPagePath } = pageContext;

	return (
		<div className={styles.pagination}>
			{previousPagePath ? <Link to={previousPagePath}>前のページ</Link> : null }
			{nextPagePath ? <Link to={nextPagePath}>次のページ</Link> : null }
		</div>
	)
}

export default Pagination
```

## 4. `template/index.js`を修正
あとは`Pagination`コンポーネントを対象のテンプレートに読み込む。
正直`props`という名前が合っていない気がするけど

```javascript
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostLinkItem from "../components/post-link-item"
import Pagination from "../components/Pagination/Pagination"
import SEO from "../components/seo"

const IndexTemplate = props => {
	const Posts = props.data.allMarkdownRemark.edges
		.filter(edge => !!edge.node.frontmatter.date)
		.map(edge => <PostLinkItem key={edge.node.id} post={edge.node} />)

	return (
		<Layout>
			<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
			<div>{Posts}</div>
			// Pagination関数の実行
			<Pagination props={props} />
		</Layout>
	)
}
```

以上で実装が完了した。