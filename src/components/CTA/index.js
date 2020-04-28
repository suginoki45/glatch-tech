import React from "react"
import styles from "./CTA.module.css"

const CTA = () => (
    <aside className={styles.cta}>
        <div className={styles.ctaInner}>
            <h2 className={styles.ctaHeading}>Web制作のご依頼・ご相談など、お気軽にご連絡ください。</h2>
            <a className={styles.ctaButton} href="https://glatchdesign.com/contact">お問い合わせ</a>
        </div>
    </aside>
)

export default CTA