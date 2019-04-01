---
path: "/how-to-prettier-wordpress-with-vscode"
date: 2018-11-13
title: VS Code側でPrettierを使ってWordPressのコーディング規約に沿ってJSとCSSを自動フォーマットする
---

Prettierがとても便利でもはや手放せないツールとなっています。以前に入門記事も書きました。

[prettier入門 – 役割を理解してESLintと併用する環境を作る【Atomとの連携も】](https://glatchdesign.com/blog/web/tools/1778)

この時はAtomを使ってたのでAtomとの連携方法を書いていますね。今はVS Codeを愛用していてとても良い感じなので、今回はVS CodeでPrettierを使用してWordPressのコーディング規約に沿ってフォーマットする環境を作りたいと思います。

## 必要なパッケージをインストール

まずは必要なパッケージをインストールしましょう。今回必要なパッケージは以下。

- eslint
- eslint-config-wordpress
- stylelint
- style-lint-config-wordpress

これらのパッケージを以下のコマンドを実行してインストールします。

```
npm i -D eslint eslint-config-wordpress stylelint style-lint-config-wordpress
```

## ESLintとstylelintの設定ファイルを用意

インストールが終わったら、ESLint、stylelintの設定ファイルを用意します。`.eslintsrc`、`.stylelintsrc`というファイルを用意し、プロジェクト直下に格納したら、各ファイルに下記の設定を記述します。


### .eslintsrc
```
{
  "extends": "wordpress"
}
```

### .stylelintsrc
```
{
  "extends": "stylelint-config-wordpress"
}
```

## VS CodeにPrettierの拡張を追加

続いてVS Codeの拡張プラグインの<a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank">Prettier</a>をインストールします。
インストールしたらESLintとstylelintをPrettierで動作するようVS Codeの設定から下記の記述をします。
```
{
  // prettierとぶつかり合うのでデフォルトの整形は無効にする
  "javascript.format.enable": false,

  // prettierでeslintを使用できるようにする
  "prettier.eslintIntegration": true,

  // prettierでstylelintを使用できるようにする
  "prettier.stylelintIntegration": true
}
```

## VS CodeにESLintとstylelintの拡張を追加

最後にリアルタイムでlintを動かす為に<a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank">ESLint</a>と<a href="https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint" target="_blank">stylelint</a>それぞれのVS Codeの拡張を入れます。
ESLintについてはファイルの保存時にフォーマットしてくれるよう設定をします。

```
{
  "eslint.autoFixOnSave": true
}
```

stylelintの自動フォーマットはないのかなあとGitHubのissueを覗いてたんですが、色々問題があるらしくペンディングになっているみたいです。

<a href="https://github.com/shinnn/vscode-stylelint/issues/138" target="_blank">Autofix on save · Issue #138 · shinnn/vscode-stylelint</a>

## おわり
以上で設定は完了です。