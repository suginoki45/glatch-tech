---
path: "/eslint-prettier-nuxtjs"
tags: ["Nuxt.js", "ESLint", "Prettier"]
date: 2019-07-25
modified: null
title: Nuxt.jsでESLint + Prettierを使う際の設定
description: Nuxt.jsでESLint + Prettierを使う際の設定を紹介しています。
---

本記事はNuxt.jsでESLintとPrettierを導入した際に行った設定を備忘録も兼ねて紹介します。

基本的には[公式ドキュメント](https://ja.nuxtjs.org/guide/development-tools/#eslint-%E3%81%A8-prettier)を参考にして設定しているので、こちらで分かる人は公式ドキュメントを読む方が早いかもしれません。

本記事では公式ドキュメントから一部カスタマイズをしたり、補足説明を加えたものになります。

## 本記事で達成すること
特定のエディタ・IDEに依存しないESLint + Prettier実行環境

## 必要なモジュールの追加
まずは必要なモジュールをnpm経由でインストールします。  
今回必要なモジュールは以下となっています。

- babel-eslint
- eslint
- eslint-config-prettier
- eslint-loader
- eslint-plugin-prettier
- eslint-plugin-vue
- prettier

これを下記コマンドでインストールしましょう。

```bash
npm i -D babel-eslint eslint eslint-config-prettier eslint-loader eslint-plugin-prettier eslint-plugin-vue prettier
```

## ESLintの設定ファイルを作成
必要なモジュールをインストールしたら、次はESLintの設定を行いましょう。  
`.eslintrc.js`というファイルをプロジェクト直下に作成し、下記を記述します。

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    "plugin:vue/recommended",
    'plugin:prettier/recommended',
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    "semi": [2, "never"],
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
      }
    }],
    "prettier/prettier": ["error", { "semi": false }]
  }
};
```

これで設定は終了です。

## 実行用コマンドをnpm-scriptsとして追加する
実行用コマンドを打てばいつでも実行できますが、毎回コマンドを打つのも面倒なので、エイリアスを`npm-script`として登録しておきましょう。  
下記のコマンドを`package.json`の`scripts`に記述します。

```bash
"scripts": {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
  "lintfix": "eslint --fix --ext .js,.vue --ignore-path .gitignore ."
}
```

設定したオプションを簡単に説明しておきます。

- `--ext`    
実行するファイルの拡張子を設定
- `--ignore-path`  
無視したいファイルを設定。デフォルトは`.eslintignore`ここでは`.gitignore`を指定してGitHubと除外ファイルの設定を共有しています。


## 保存時にLintを実行する
`npm-scripts`でいつでも実行できるようになりましたが、開発中はそれすらも面倒ですよね。

Nuxt.jsでは`nuxt.config.js`内に下記の設定を記述することでファイルの変更を検知してくれ、変更時にLintが走るようになります。

```js
export default {
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
}
```