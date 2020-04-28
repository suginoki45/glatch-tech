import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import kebabCase from 'lodash/kebabCase'
import Adsense from 'react-adsense'
import styles from "./IndexFooter.module.css"

const Footer = () => (
  <StaticQuery
    query={graphql`
      query TagQuery {
        allMarkdownRemark(limit: 1000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `}
    render={data => (
      <>
        <aside className={styles.blogFooter}>
          <div className={styles.blogFooterCategory}>
            <h3 className={styles.sectionHeading}>
              <span>tag</span>
              タグ
            </h3>
            <ul className={styles.tags}>
              {
                data.allMarkdownRemark.group.map((tag, i) =>
                  <li key={i} className={styles.tagsItem}>
                    <Link className={styles.tagsLink} to={`/tags/${kebabCase(tag.fieldValue)}`}>{tag.fieldValue}</Link>
                  </li>
                )
              }
            </ul>
          </div>
          <div className={styles.blogFooterSearch}>
            <div className={styles.adBlogFooter}>
              {
                <Adsense.Google
                  client="ca-pub-6751393007626667"
                  slot="4066506125"
                  format="rectangle"
                />
              }
            </div>
          </div>
        </aside>
      </>
    )}
  />
)

export default Footer
