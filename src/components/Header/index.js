import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import cx from "classnames"
import styles from "./header.module.css"

const Header = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: ''
    };
  }

  updateState = (state) => {
    this.setState(state);
  }

  render() {
    return(
      <header className={`${styles.header}`}>
        <div className={styles.headerInner}>
          <h1 className={styles.siteTitle}>
            <Link
              to="/"
              className={styles.siteLogo}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 77.65 20.67">
                <title>logo</title>
                <g>
                  <path
                    d="M17.64 9.61v9.16a17.13 17.13 0 0 1-1.94.91 14.29 14.29 0 0 1-1.83.55 17.51 17.51 0 0 1-1.92.34c-.61.06-1.22.1-1.83.1a10.64 10.64 0 0 1-4.28-.8 9.21 9.21 0 0 1-5.16-5.33 10.47 10.47 0 0 1-.68-3.8 10.54 10.54 0 0 1 .73-3.93 9.9 9.9 0 0 1 2-3.15 9.44 9.44 0 0 1 3.12-2.1 10 10 0 0 1 4-.76 11.72 11.72 0 0 1 4.28.65 8.8 8.8 0 0 1 3 1.82l-1.74 1.88a7.67 7.67 0 0 0-2.78-1.5 8.33 8.33 0 0 0-2.75-.44 6.9 6.9 0 0 0-5.19 2.21 7.31 7.31 0 0 0-1.44 2.39 8.6 8.6 0 0 0-.51 2.93 7.92 7.92 0 0 0 .57 3 7.42 7.42 0 0 0 1.54 2.4 7.39 7.39 0 0 0 2.33 1.58 7.27 7.27 0 0 0 2.91.58 12.48 12.48 0 0 0 2.58-.3 13.48 13.48 0 0 0 2.4-.71v-5.28h-4.17v-2.39h6.76z" />
                  <path
                    d="M21.53 0h2.4v20.19h-2.4z" />
                  <path
                    d="M37.34 7.58h2.49v12.51h-2.49v-.9c-1.19 1.11-3.3 1.26-4.67 1.26a5.54 5.54 0 0 1-4.29-1.88 6.94 6.94 0 0 1-1.68-4.77 6.78 6.78 0 0 1 1.68-4.69 5.45 5.45 0 0 1 4.22-1.88c1.45 0 3.58.19 4.74 1.39zm-8.42 6.28a4.31 4.31 0 0 0 4.15 4.47h.07c1.66 0 4.25-.85 4.25-4.47 0-3.9-2.74-4.47-4.25-4.47s-4.14.94-4.22 4.47z" />
                  <path
                    d="M51.19 9.62h-3.44v6.800000000000001a2.5 2.5 0 0 0 .2.93 1.51 1.51 0 0 0 .53.67 1.78 1.78 0 0 0 1.05.25 5.26 5.26 0 0 0 .89-.08c.27 0 .58-.11.82-.17v2.1a4.19 4.19 0 0 1-1.1.31 9.47 9.47 0 0 1-1.06.09 4.81 4.81 0 0 1-2.08-.39 2.58 2.58 0 0 1-1.12-1 3.19 3.19 0 0 1-.43-1.37l-.07-1.54v-6.6h-3.5v-2.08h3.5v-3.54h2.4v3.54h3.45v2.08z" />
                  <path
                    d="M62.41 10.89a5.81 5.81 0 0 0-1.55-1.05 4.07 4.07 0 0 0-1.75-.36 4 4 0 0 0-1.73.36 3.65 3.65 0 0 0-1.22 1 4.4 4.4 0 0 0-.75 1.44 5.47 5.47 0 0 0-.25 1.7 4.52 4.52 0 0 0 .29 1.67 4.14 4.14 0 0 0 .83 1.35 3.77 3.77 0 0 0 1.28.92 4 4 0 0 0 1.68.33 3.75 3.75 0 0 0 1.76-.34 5.18 5.18 0 0 0 1.55-1.07l1.75 1.55a6.78 6.78 0 0 1-2.43 1.67 7.68 7.68 0 0 1-2.64.46 7.47 7.47 0 0 1-2.7-.52 6.46 6.46 0 0 1-2.1-1.35 5.82 5.82 0 0 1-1.36-2.09 7.19 7.19 0 0 1-.48-2.68 7.33 7.33 0 0 1 .48-2.7 6 6 0 0 1 3.43-3.45 7.15 7.15 0 0 1 2.71-.49 7.33 7.33 0 0 1 2.66.49 6.07 6.07 0 0 1 2.4 1.69z" />
                  <path
                    d="M66.44 0h2.4v8.73a4.84 4.84 0 0 1 4.22-1.52 7 7 0 0 1 1.75.28 4 4 0 0 1 1.47.87 4.16 4.16 0 0 1 1 1.51 5.73 5.73 0 0 1 .37 2.13v8.15h-2.4v-7.44a4.34 4.34 0 0 0-.25-1.51 2.63 2.63 0 0 0-.64-1 2.24 2.24 0 0 0-.92-.56 3.31 3.31 0 0 0-1.08-.18 4.06 4.06 0 0 0-1.36.23 3.09 3.09 0 0 0-1.12.76 3.66 3.66 0 0 0-.75 1.33 6.07 6.07 0 0 0-.27 1.9v6.51h-2.4v-20.19z" />
                </g>
              </svg>
            </Link>
          </h1>
          <nav
            className={`${styles.globalNavi} ${(this.state.navBarActiveClass) ? styles[this.state.navBarActiveClass]: '' }`}>
            <ul className={styles.globalNaviInner}>
              <li className={styles.globalNaviItem}>
                <a
                  className={styles.globalNaviLink}
                  href="https://glatchdesign.com/about/">
                  事業概要<span>about</span>
                </a>
              </li>
              <li className={styles.globalNaviItem}>
                <a
                  className={styles.globalNaviLink}
                  href="https://glatchdesign.com/works/">
                  制作実績<span>works</span>
                </a>
              </li>
              <li className={styles.globalNaviItem}>
                <a
                  className={styles.globalNaviLink}
                  href="https://glatchdesign.com/price/">
                  参考価格<span>price</span>
                </a>
              </li>
              <li className={styles.globalNaviItem}>
                <a
                  className={styles.globalNaviLink}
                  href="https://glatchdesign.com/flow/">
                  制作の流れ<span>flow</span>
                </a>
              </li>
              <li className={styles.globalNaviItem}>
                <a
                  className={styles.globalNaviLink}
                  href="https://glatchdesign.com/blog/">
                  ブログ<span>blog</span>
                </a>
              </li>
              <li className={styles.globalNaviItem}>
                <a
                  className={styles.globalNaviLink}
                  href="https://glatchdesign.com/faq/">
                  よくある質問<span>faq</span>
                </a>
              </li>
              <li className={styles.globalNaviItem}>
                <a
                  className={styles.globalNaviLink}
                  href="https://glatchdesign.com/contact/">
                  お問い合わせ<span>contact</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <Hamburger updateState={this.updateState} />
      </header>
    )
  }
}

Header.displayName = 'Header'

const propTypes = {
  dataToggle: PropTypes.func,
}

const Hamburger = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: ''
    };
  }

  toggleHamburger = () => {
    this.setState(
      {
        active: !this.state.active,
      },
      () => {
        if(this.state.active) {
          this.setState(
            {
              navBarActiveClass: 'isActive',
            },
            () => {
              this.props.updateState(this.state)
            }
          )
        } else {
          this.setState(
            {
              navBarActiveClass: '',
            },
            () => {
              this.props.updateState(this.state)
            }
          )
        }        
        console.log(this.state)
      }
    )
  }

  render() {
    return (
      <div
        className={`${styles.toggle} ${(this.state.navBarActiveClass) ? styles[this.state.navBarActiveClass]: '' }`}
        onClick={() => {this.toggleHamburger()}}
      >
        <div className={styles.toggleInner}>
          <div className={`${styles.toggleBar} ${styles.toggleBar1} ${(this.state.navBarActiveClass) ? styles[this.state.navBarActiveClass]: '' }`}></div>
          <div className={`${styles.toggleBar} ${styles.toggleBar2} ${(this.state.navBarActiveClass) ? styles[this.state.navBarActiveClass]: '' }`}></div>
        </div>
      </div>
    )
  }
}

Hamburger.displayName = 'Hamburger'
Hamburger.propTypes = propTypes

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
