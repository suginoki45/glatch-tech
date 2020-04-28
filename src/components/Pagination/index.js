import { Link } from "gatsby"
import React from "react"
import styles from "./Pagination.module.css"

const Pagination = ({ props }) => {
  const { pageContext } = props;
  const { pageNumber, numberOfPages } = pageContext;

  return (
    <ul className={styles.pagination}>
      {(() => {
        const items = []
        for(let i = 0; i < numberOfPages; i++) {
          if(pageNumber === i) {
              items.push(<li key={i} className={styles.paginationItem}><span className={styles.paginationNumber}>{i + 1}</span></li>)
          } else {
            if(i === 0) {
              items.push(<li key={i} className={styles.paginationItem}><Link className={styles.paginationNumber} to="/">{i + 1}</Link></li>)
            } else {
              items.push(<li key={i} className={styles.paginationItem}><Link className={styles.paginationNumber} to={'/page/' + (i + 1)}>{i + 1}</Link></li>)
            }
          }
        }
        return items
      })()}
    </ul>
  )
}

export default Pagination