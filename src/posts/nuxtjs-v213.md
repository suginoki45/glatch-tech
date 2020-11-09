---
path: "/nuxtjs-v213"
tags: ["Nuxt.js"]
date: 2020-08-18
modified: 2020-11-05
title: Nuxt.js2.13のアップデートを確認する
description: Nuxt.js2.13で個人的に気になるアップデートを確認し、備忘録として記事にしました。
---

少々時間が経ってしまいましたが、6/19, 2020にリリースされたNuxt.js 2.13は目玉機能であるFull Static Generation（完全静的モード）を始めとした魅力的な機能が搭載されたので備忘録がてら記事にしておきたいと思います。

## 主な追加機能
個人的には何と言ってもFull Static Generationですが、その他にも主な機能としては下記のような機能が追加されています。
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Nuxt v2.13 is out ✨<br><br>▵ Full Static Generation<br>▵ Runtime Config<br>▵ Components Discovery<br>▵ Nuxt Telemetry<br>▵ .env support<br>▵ And more 👀<br><br>Read more on <a href="https://t.co/ukNMnI0UMN">https://t.co/ukNMnI0UMN</a><br><br>Thread 👇 <a href="https://t.co/7UhPPf4ynU">pic.twitter.com/7UhPPf4ynU</a></p>&mdash; Nuxt.js (@nuxt_js) <a href="https://twitter.com/nuxt_js/status/1273686140206399488?ref_src=twsrc%5Etfw">June 18, 2020</a></blockquote>

詳細は以下に記載があります。  
https://github.com/nuxt/nuxt.js/releases/tag/v2.13.0

今回はその中から個人的に気になった下記についてメモをしておきたいと思います。

- Full Static Generation（完全静的モード）
- 動的ルーティングの自動生成
- コンポーネントの自動インポート

## Full Static Generation（完全静的モード）
Nuxt.jsは0.3.2とかなり前から静的に生成する機能は搭載されていましたが、Webページが遷移する際にAPIリクエストが発生する仕様でした。その為、APIサーバーが死んでいるとページ遷移の際にエラーが出てしまい、完全な静的サイトとは言えない状況でした。

今回のアップデートでこの事象が改善され完全に静的なページが生成されるようになりました。素晴らしい！

Full Static Generationの実装方法
`nuxt generate`を既に使用している場合、今回のアップデートで新たに導入された`target`オプションを`next.config.js`に記述します。

```js
export default {
  mode: 'universal',
  target: 'static',
}
```

`static`モードはNuxt側に静的ファイルを出力するよう指示します。

あとはこれまで使用していた`nuxt generate`の代わりに`nuxt build && nuxt export`を実行して完了です。

```shell
nuxt build && nuxt export
```

参考  
[Going Full Static - NuxtJS](https://nuxtjs.org/blog/going-full-static)

### 生成されたページのローカルでの確認方法が追加された
生成したページの生成は新たに追加された`nuxt serve`コマンドを実行することで簡単に確認できるようになりました。

```shell
nuxt serve
```

## 動的ルーティングの自動生成
Full Static Generationの次に個人的に感動したのが動的ルーティングの自動生成です。

動的ルーティングを行う場合、v2.12以前は下記のように`nuxt.config.js`で明示的に設定が必要でした。

```js
export default {
  generate: {
    routes () {
      const { data } = await axios.get(`${apiUrl}/posts?_embed`)
      return data.map(post => {
        return {
          route: post.id,
          payload: post
        }
      })
    }
  }
}
```

それがv2.13以降は上記のような設定は一切不要で動的ルーティングを自動で生成してくれます。最高ですね。

参考  
[Going Full Static - NuxtJS](https://nuxtjs.org/blog/going-full-static)


## コンポーネントの自動インポート
コンポーネントを使用する際、v2.12以前は以下のように`import`でコンポーネントファイルをインポートし、`components`にインポートしたコンポーネントを登録するという作業が必要でした。

```vue
<template>
  <div>
    <Button />
  </div>
</template>

<script>
import Button from '~/components/Button'

export default {
  components: {
    Button
  }
}
</script>
```

v2.13以降では`nuxt.config.js`に`components`プロパティが追加され、値を`true`にすることで自動的にコンポーネントが読み込まれるようになりました。

```
components: true
```

これにより下記のようにコンポーネントのインポートおよび登録の記述は一切必要なくなりました。


```vue
<template>
  <div>
    <Button />
  </div>
</template>

<script>

export default {
}
```

なお、v2.13時点では`is`プロパティを用いてコンポーネントを動的に切り替えられるDynamic Components（動的コンポーネント）には自動インポートは対応していないようです。

参考  
自動インポートについて  
[Improve Your Developer Experience With Nuxt Components - NuxtJS](https://nuxtjs.org/blog/improve-your-developer-experience-with-nuxt-components)

動的コンポーネントについて  
[動的コンポーネント - コンポーネントの基本 — Vue.js](https://jp.vuejs.org/v2/guide/components.html#%E5%8B%95%E7%9A%84%E3%81%AA%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88)

以上、v2.13では魅力的なアップデートが満載でした。
