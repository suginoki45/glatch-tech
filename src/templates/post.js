import React from "react"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Link, graphql } from "gatsby"
import styles from "./post.module.css"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function BlogTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <div>
        <article>
          <ul className={styles.postDateList}>
            <li className={styles.postDateList}>
              <time className={styles.postDate}>{frontmatter.date}</time>
            </li>
            <li className={styles.postDateList}>
              <time className={styles.postDate}>{frontmatter.modified}</time>
            </li>
          </ul>
          <h1 className={styles.postTitle}>{frontmatter.title}</h1>
          {
            frontmatter.tags &&
            <ul className={styles.tags}>
              {frontmatter.tags.map((tag, i) => (
                <li className={styles.tagsItem} key={i}>
                  <Link className={styles.tagsLink} to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          }
          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: html }} />
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
      }
    }
  }
`
