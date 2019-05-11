---
path: "/start-browser-sync"
date: 2019-05-06
title: Browsersyncの基本的な使い方
---

開発でたいへんお世話になっているBrowsersyncの基本的な使い方をまとめておく。

## Browsersyncのインストール

```
npm i -D browser-sync
```

## 基本設定

```
"scripts": {
  "browsersync": "browser-sync start --server --files './*.html' '**/*'"
}
```

`--server`オプションを忘れると動かないので注意。
`--files`オプションで監視したいファイルを設定すると、変更があった際に自動でリロードを行ってくれる。

以上で必要最小限の設定は完了。
あとは必要に応じて[公式ドキュメント](https://www.browsersync.io/docs/command-line)を元に設定。