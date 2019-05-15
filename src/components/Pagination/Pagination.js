import { Link } from "gatsby"
import React from "react"
import styles from "./Pagination.module.css"

const Pagination = ({ props }) => {
  const { pageContext } = props;
  const { previousPagePath, nextPagePath } = pageContext;
  
  return (
    <div className={styles.pagination}>
      {previousPagePath ? <Link to={previousPagePath}>前のページ</Link> : null }
      {nextPagePath ? <Link to={nextPagePath}>次のページ</Link> : null }
    </div>
  )
}

export default Pagination