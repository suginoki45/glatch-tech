import Typography from "typography"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.75,
  bodyFontFamily: [
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
      fontSize: '1.6rem',
      lineHeight: 1.3,
      marginTop: rhythm(2),
      marginBottom: rhythm(1.25)
    },
    h3: {
      marginTop: rhythm(1.75),
      marginBottom: rhythm(1)
    },
    p: {
      marginTop: rhythm(1),
      marginBottom: rhythm(1)
    }
  })
})

export default typography
