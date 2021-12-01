import React from "react"
import { graphql } from "gatsby"
import styles from "./post.module.css"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Tag from "../components/Tag"
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
        <ul className={styles.postDateList}>
          <li className={styles.postDateListItem}>
            <time className={styles.postDate}>
              {data.markdownRemark.frontmatter.date}
            </time>
          </li>
          <li className={styles.postDateListItem}>
            <time className={styles.postDate}>
              {data.markdownRemark.frontmatter.modified}
            </time>
          </li>
        </ul>
        <ul className={styles.tags}>
          {data.markdownRemark.frontmatter.tags.map((tag, i) => (
            <Tag key={i} tag={tag} />
          ))}
        </ul>
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
