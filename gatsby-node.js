const path = require("path")
const _ = require("lodash")
const { paginate } = require("gatsby-awesome-pagination")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`src/templates/post.js`)
  const tagTemplate = path.resolve(`src/templates/tags.js`)

  const buildPagination = posts => {
    paginate({
      createPage,
      items: posts,
      itemsPerPage: 10,
      pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? "/" : "/page"),
      component: path.resolve('src/templates/index.js')
    })
  }

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    buildPagination(posts)

    // Create post detail pages
    posts.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
        context: {}, // additional data can be passed via context
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      })
    })
  })
}
