import { Link } from "gatsby"
import kebabCase from 'lodash/kebabCase'
import React from "react"
import styles from "./Tags.module.css"

const Tag = ({ tag }) => (
    <li className={styles.tagsItem}>
        <Link className={styles.tagsLink} to={`/tags/${kebabCase(tag)}/`}>
            {tag}
        </Link>
    </li>
);

export default Tag;
