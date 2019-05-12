---
path: "/gatsby-google-analytics"
tags: ["GatsbyJS", "Google Analytics"]
date: 2019-05-12
title: GatsbyにGoogle Analyticsを導入する
---

GatsbyでGoogle Analyticsを導入した。
導入にあたっては`gatsby-plugin-google-analytics`というプラグインを使用する。

## プラグインのインストール
まずはプラグインをインストールする。
```shell
npm i -S gatsby-plugin-google-analytics
```

## gatsby-config.jsの設定
続いて`gatsby-config.js`に以下の設定を記述する。

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    }
  ]
}
```

最低限`trackingId`を導入すれば導入が完了する。その他に設定したオプションについて簡単に覚書。

### `head`オプション
読み込み用の`script`タグの記述を`head`タグ内にするか`body`タグにするかどうかを決めるオプション。`true`で`head`内に、`false`で`body`内に記述される。

### `anonymize`オプション
一部の国（ドイツなど）では、Google Analyticsに`_anonymizeIP`関数を使用する必要があるとのこと。その`_anonymizeIP`を使用するかどうかを決めるためのオプション。

### `respectDNT`オプション
このオプションを有効にすると「DNT (Do Not Track)」が有効になっている訪問者に対してGoogle Analyticsが読み込まれないようになる。ちなみにこのDNTオプションは各ブラウザに実装されている。

[各ブラウザにおけるトラッキング拒否機能 （DNT） の有効化について](https://hyper-text.org/archives/2018/02/how_to_do_not_track_setting.shtml)

この他にも設定項目がある。詳しくは[Gatsbyの公式のドキュメント](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/)を参照。