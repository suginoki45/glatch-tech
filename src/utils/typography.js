import Typography from "typography"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.75,
  bodyFontFamily: [
    "objektiv-mk2",
    "Helvetica Neue",
    "Noto Sans JP",
    "游ゴシック体",
    "Yugothic",
    "游ゴシック",
    "Yu Gothic",
    "Verdana",
    "メイリオ",
    "sans-serif",
  ],
  headerFontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Helvetica Neue",
    "游ゴシック体",
    "Yugothic",
    "游ゴシック",
    "Yu Gothic",
    "Verdana",
    "メイリオ",
    "sans-serif",
  ],
  overrideStyles: ({ rhythm }) => ({
    h1: {
      lineHeight: 1.3,
    },
    h2: {
      fontSize: '1.5rem',
      lineHeight: 1.3,
      marginTop: rhythm(1.75),
      marginBottom: rhythm(1)
    },
    h3: {
      marginTop: rhythm(1.5),
      marginBottom: rhythm(1)
    },
    p: {
      marginTop: rhythm(1),
      marginBottom: rhythm(1)
    }
  })
})

export default typography
