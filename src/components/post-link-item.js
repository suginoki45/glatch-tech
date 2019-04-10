import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

const Post = styled.div`
  border-top: 1px solid #e5e5e5;
  &:last-child {
    border-bottom: 1px solid #e5e5e5;
  }
`

const PostLink = styled(Link)`
  display: block;
  padding: 24px;
  color: #333;
  text-decoration: none;
  line-height: 1.25;
  &:hover {

  background-color: #e5e5e5;
  }
`

const PostTitle = styled.p`
  margin-bottom: 0;
  font-size: 1.1rem;
  font-weight: bold;
`

const PostDate = styled.time`
  font-size: 0.75rem;
`

const PostLinkItem = ({ post }) => (
  <Post>
    <PostLink to={post.frontmatter.path}>
      <PostTitle>{post.frontmatter.title}</PostTitle>
      <PostDate>{post.frontmatter.date}</PostDate>
    </PostLink>
  </Post>
)

export default PostLinkItem
