import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components'

import Layout from "../components/layout"
import SEO from "../components/seo"

const PostContainer = styled.div`

`

const PostTitle = styled.h1`
  margin-bottom: 0;
  font-size: 1.75rem;
`

const PostDateList = styled.ul`
  display: flex;
  margin-left: 0;
  margin-bottom: 0;
  list-style: none;
  `
  
const PostDateItem = styled.li`
  margin-bottom: 5px;
  &:last-child {
    margin-left: 10px;
  }
`

const PostDate = styled.time`
  font-size: 0.75rem;
`

const PostContent = styled.div`
  margin-top: 2rem;
`

export default function BlogTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <PostContainer>
        <article>
          <PostDateList>
            <PostDateItem>
              <PostDate>{frontmatter.date}</PostDate>
            </PostDateItem>
            <PostDateItem>
              <PostDate>{frontmatter.modified}</PostDate>
            </PostDateItem>
          </PostDateList>
          <PostTitle>{frontmatter.title}</PostTitle>
          <PostContent
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </PostContainer>
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
      }
    }
  }
`
