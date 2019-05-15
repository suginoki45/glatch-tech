import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostLinkItem from "../components/post-link-item"
import Pagination from "../components/Pagination/Pagination"
import SEO from "../components/seo"

const IndexTemplate = props => {
  const Posts = props.data.allMarkdownRemark.edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLinkItem key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div>{Posts}</div>
      <Pagination props={props} />
    </Layout>
  )
}

export default IndexTemplate

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "YYYY年MM月DD日")
            path
            title
          }
        }
      }
    }
  }
`
