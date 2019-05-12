---
path: "/browsersync-ssi"
tags: ["BrowserSync"]
date: 2019-02-03
title: BrowsersyncのrewriteRulesを使用してSSI環境を作る
---

久しぶりにSSIを使う必要がありBrowsersyncでできるようなのでやり方をメモ。
[browsersync-ssi](https://www.npmjs.com/package/browsersync-ssi)を使う方法がよく出てるけど、今回はBrowsersyncのrewriteRulesというオプションで実現する方法を紹介。

## npmパッケージのインストール
必要なパッケージは下記の3つ。

```shell
npm i -D browsersync fs path
```

## js側の設定
ここでは`server.js`という名前でファイルを作成し、下記のような設定をする。

```javascript
const path = require('path');
const fs = require('fs');
const browserSync = require('browser-sync');

browserSync.init({
  server: './',
  rewriteRules: [
    {
      match: /<!--#include virtual="(.+?)" -->/g,
      fn: function(req, res, match, filename) {
        const filePath = path.join(__dirname, filename);
        if (!fs.existsSync(filePath)) {
          return `<span style="color: red">${filePath} could not be found</span>`;
        }
        return fs.readFileSync(filePath);
      }
    }
  ]
});
```

## 実行
```shell
node server.js
```