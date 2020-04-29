import React from "react"
import { Link } from "gatsby"
import Tag from "../Tag"
import styles from "./PostLinkItem.module.css"

const PostLinkItem = ({ post }) => (
  <div className={styles.post}>
    <header className={styles.postHeader}>
    <time className={styles.postDate}>{post.frontmatter.date}</time> |
    <ul className={styles.postTags}>
      {post.frontmatter.tags.map((tag, i) => (
        <Tag key={i} tag={tag} />
      ))}
    </ul>
    </header>
    <Link className={styles.postLink} to={post.frontmatter.path}>
      <p className={styles.postTitle}>{post.frontmatter.title}</p>
    </Link>
  </div>
)

export default PostLinkItem
