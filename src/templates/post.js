import React from "react"
import { graphql } from "gatsby"
import styles from "./post.module.css"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Tag from "../components/Tag"

export default function BlogTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <div>
        <article className={styles.post}>
          <h1 className={styles.postTitle}>{frontmatter.title}</h1>
          <ul className={styles.postDateList}>
            <li className={styles.postDateListItem}>
              <time className={styles.postDate}>{frontmatter.date}</time>
            </li>
            <li className={styles.postDateListItem}>
              <time className={styles.postDate}>{frontmatter.modified}</time>
            </li>
          </ul>
          <ul className={styles.tags}>
            {frontmatter.tags.map((tag, i) => (
              <Tag key={i} tag={tag} />
            ))}
          </ul>
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
        description
      }
    }
  }
`
