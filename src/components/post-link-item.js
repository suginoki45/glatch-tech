import React from "react"
import { Link } from "gatsby"
import styles from "./postLink.module.css"

const PostLinkItem = ({ post }) => (
  <div className={styles.post}>
    <Link className={styles.postLink} to={post.frontmatter.path}>
      <p className={styles.postTitle}>{post.frontmatter.title}</p>
      <time className={styles.postDate}>{post.frontmatter.date}</time>
    </Link>
  </div>
)

export default PostLinkItem
