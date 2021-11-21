import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import PostLinkItem from "../components/PostLinkItem"
import Pagination from "../components/Pagination"
import IndexFooter from "../components/IndexFooter"
import SEO from "../components/SEO"

const IndexTemplate = (props) => {
  const Posts = props.data.allMarkdownRemark.edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLinkItem key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div>{Posts}</div>
      <Pagination props={props} />
      <IndexFooter props={props} />
    </Layout>
  )
}

export default IndexTemplate

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "YYYY/MM/DD")
            path
            title
            tags
          }
        }
      }
    }
  }
`
