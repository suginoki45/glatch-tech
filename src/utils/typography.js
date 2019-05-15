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
  overrideStyles: () => ({
    h2: {
      fontSize: '1.5rem',
      lineHeight: 1.3,
      marginTop: '3rem',
      marginBottom: '1.5rem'
    },
    h3: {
      marginTop: '2.5rem',
      marginBottom: '1.25rem'
    }
  })
})

export default typography
