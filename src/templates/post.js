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
          <PostDate>{frontmatter.date}</PostDate>
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
        date(formatString: "YYYY年MM月DD日")
        path
        title
      }
    }
  }
`
