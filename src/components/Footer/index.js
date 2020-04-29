import React from "react"
import styles from "./Footer.module.css"
import logo from "../../images/logo.svg"

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerInner}>
    <div className={styles.footerMeta}>
      <a
        href="https://glatchdesign.com/"
        className={styles.footerSitename}>
      <img
          src={logo}
          alt="Glatch" />
      </a>
      <p className={styles.footerSitedescription}>
        夫婦で活動するフリーランスWeb制作ユニット
      </p>
    </div>
    <nav className={styles.footerNavs}>
        <ul className={styles.footerNav}>
        <li className={styles.footerNavItem}>
          <a
          href="https://glatchdesign.com/about/"
          className={styles.footerNavLink}>事業概要</a>
        </li>
        <li className={styles.footerNavItem}>
          <a
          href="https://glatchdesign.com/works/"
          className={styles.footerNavLink}>制作実績</a>
        </li>
        <li className={styles.footerNavItem}>
          <a
          href="https://glatchdesign.com/price/"
          className={styles.footerNavLink}>参考価格</a>
        </li>
        <li className={styles.footerNavItem}>
          <a
          href="https://glatchdesign.com/flow/"
          className={styles.footerNavLink}>制作の流れ</a>
        </li>
        </ul>
        <ul className={styles.footerNav}>
        <li className={styles.footerNavItem}>
          <a
          href="https://glatchdesign.com/blog/"
          className={styles.footerNavLink}>ブログ</a>
        </li>
        <li className={styles.footerNavItem}>
          <a
          href="https://tech.glatchdesign.com/"
          className={styles.footerNavLink}>技術ブログ</a>
        </li>
        </ul>
        <ul className={styles.footerNav}>
        <li className={styles.footerNavItem}>
          <a
          href="https://glatchdesign.com/faq/"
          className={styles.footerNavLink}>よくある質問</a>
        </li>
        <li className={styles.footerNavItem}>
          <a
          href="https://glatchdesign.com/contact/"
          className={styles.footerNavLink}>お問い合わせ</a>
        </li>
        </ul>
        <ul className={styles.footerNav}>
        <li className={styles.footerNavItem}>
          <a
          href="https://glatchdesign.com/privacy/"
          className={styles.footerNavLink}>プライバシーポリシー</a>
        </li>
        </ul>
    </nav>
    </div>
    <p className={styles.footerCopyright}>
      <small>© 2015 Glatch（グラッチ）</small>
    </p>
  </footer>
)

export default Footer
