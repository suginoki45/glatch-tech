import React from "react"
import { Link } from "gatsby"

import "./post-link.css"

const PostLink = ({ post }) => (
  <div className="post">
    <Link to={post.frontmatter.path}>
      <p className="post__title">{post.frontmatter.title}</p>
      <time className="post__date">{post.frontmatter.date}</time>
    </Link>
  </div>
)

export default PostLink
