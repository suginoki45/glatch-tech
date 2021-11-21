import { Link } from "gatsby"
import React from "react"
import styles from "./PageHeading.module.css"

const PageHeading = () => (
    <header className={styles.pageHeader}>
        <h1 className={styles.pageHeading}>
            <span className={styles.pageHeadingEn}>tech blog</span>
            <Link to="/">技術メモ</Link>
        </h1>
        <p className={styles.pageDescription}>Web制作に関連する技術を発信しています。</p>
    </header>
)

export default PageHeading;