import React from "react"
import styles from "./TOC.module.css"

const TOC = ({ html }) => {
  return <div className={styles.tableOfContents} dangerouslySetInnerHTML={{ __html: html }} />
}
export default TOC