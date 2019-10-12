---
path: "/eslint-stylelint-without-prettier-for-nuxtjs"
tags: ["ESLint", "Nuxt.js"]
date: 2019-08-11
modified: null
title: PrettierなしでNuxt.jsでESLintの設定をする
description: Prettierを使わずにNuxt.jsでESLintをリアルタイムで実行し、保存時に整形する設定方法を紹介します。
---

一つ前のポストで[Nuxt.jsでESLint + Prettierを使う際の設定](/eslint-prettier-nuxtjs)というエントリーを書きましたが、ESLintとPrettierに加え、stylelintも絡めると頭が混乱してきて、凡人エンジニアの私にとっては手の追えない状態になってしまいました。

その時ふと「**そもそもPrettierって無くても良いんじゃない？**」という考えが浮かび、PrettierなしでESLintとstylelintを愛用のエディタVisual Studio Codeで快適に使える環境を作ってみようと思い立ち、本エントリーが生まれました。

## 本記事で達成すること
Nuxt.jsの開発でPrettierなしでESLintとstylelintをVisual Studio Codeでリアルタイムでlintが走るようにする。

## 前提
- Nuxt.jsを導入済み
- Node.js（およびnpm）を導入済み

## ESLintの設定
はじめにESlintから設定をしていきます。  
まずは環境構築に必要なモジュールをnpm経由で追加しましょう。

### 必要なモジュールを追加
ESLintに必要なモジュールはたった2つだけ。Prettierがないととてもシンプルですね。

- eslint
- eslint-plugin-vue

npmでサクッと追加しましょう。

```bash
npm i -D eslint eslint-plugin-vue
```

### `.eslintrc.js`の作成
次に`.eslintrc.js`というファイルをプロジェクト直下に作成します。

### まず`.vue`を構文チェックする最低限の設定をしよう
まずは`.vue`ファイルの構文をチェックする設定をやっていきます。  
`.eslintrc.js`を下記の通り記述しましょう。

```js
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  plugins: ["vue"]
}
```

これだけでOKです。

### 実行してみる
実際にESLintを実行してみましょう。`package.json`の`npm-scripts`にエイリアスとなるコマンドを設定します。
```json
"scripts": {
    "lint": "eslint --ext .js,.vue"
}
```
設定したら`lint`コマンドを叩いてみましょう。
```bash
npm run lint
```

ここまでの正しく設定できていれば下記のようにLint結果が表示されるはずです。

```bash
$ npm run lint
> eslint --ext .js,.vue
---
ここにエラーメッセージがずらーっと表示される
---
✖ 12 problems (1 error, 11 warnings)
```
### ESLintをリアルタイムで実行、保存時に整形する設定をしよう
ESLintを実行する環境ができましたが、使用するたびにコマンドを叩くのは面倒です。  
なのでここではファイルを保存時にESLintが実行されるように設定をしていきます。

1. VS Codeの[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)のエクステンションを追加
2. VS Codeで`cmd + ,`で設定ファイルを開く
3. 検索窓に`esLint`と入力
4. 「**ESLint: Auto Fix On Save**」という項目を探しチェックを入れる

以上で設定は完了です。  
正しく設定されていれば、ファイルを編集時にリアルタイムてESLintが実行され、保存時には整形されるようになります。

次回はstylelintの設定について紹介します。