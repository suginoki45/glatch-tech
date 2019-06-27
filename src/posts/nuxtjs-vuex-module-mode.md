---
path: "/nuxtjs-vuex-module-mode"
tags: ["Nuxt.js", "Vuex"]
date: 2019-06-28
modified: null
title: Nuxt.jsでVuexをモジュールモードで使用する際のTips
description: Nuxt.jsでVuexをモジュールモードで使用する際のポイントやハマりどころを紹介しています。
---

## はじめに
Nuxt.jsでVuexを使用する場合、クラシックモードとモジュールモードの2種類の書き方があります。
これまでクラシックモードで使用していましたが、このクラシックモードが次期に廃止されるとのこと。
この機会にモジュールモードに書き換えてみるか〜と思ったので試してみました。

## モジュールモードにするには
以下の条件を満たすことでモジュールモードとして動作するようになります。

- `store/index.js`がstoreオブジェクトを返さない。
- または`index.js`が存在しない。

## モジュールモードで書いた例
WordPressのWP Rest APIから情報の取得を想定した処理を例にします。
（コードの内容は本記事の趣旨と関係ないので検証していません。コード自体は参考にしないでください汗）

### store/wp.js

```javascript
export const state = () => ({
  page: null,
  meta: {
    description: '',
    name: ''
  },
  wordpressAPI: 'https://glatchdesign.com/wp-json'
})

export const mutations = {
  setPage (state, data) {
    state.page = data
  },
  setMeta (state, data) {
    state.meta = data
  }
}

export const actions = {
  async fetchMeta ({ commit, state }) {
    let meta = await this.$axios.get(state.wordpressAPI)
    commit('setMeta', meta.data)
  }
}
```

## stateとmutationの参照方法
### state
ファイル名がそのままnamespaceになるので`state`の参照は`this.$store.state.storeモジュールのファイル名.state名.メソッド名`のような形で呼び出すことができます。

```javascript
this.$store.state.wp.meta.name
```

### mutation
`mutation`は`storeモジュールのファイル名/mutationの関数名`のような形で呼び出すことができます。

```javascript
export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch(`wp/fetchMeta`)
  }
}
```

## ハマりどころ
### nuxtServerInitはstore/index.jsに
小一時間ハマったのですが、`nuxtServerInit`を定義している場合、`store/index.js`に記述しないと動作しない仕様ですのでご注意ください。
[公式ドキュメント](https://ja.nuxtjs.org/guide/vuex-store/)にもその旨書かれてますね。公式ドキュメントをちゃんと読めって話です。