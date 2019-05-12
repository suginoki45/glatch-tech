---
path: "/node-sass-rebuild"
tags: ["Node.js", "Gulp"]
date: 2018-08-09
title: node.jsのバージョンアップ後にgulp実行時にnode-sassがエラーになる
---

node.js をバージョンアップ後に gulp を実行したら以下のようなエラーに遭遇しました。

```
Error: Missing binding /Users/user-name/sitedata/node_modules/gulp-sass/node_modules/node-sass/vendor/darwin-x64-48/binding.node
Node Sass could not find a binding for your current environment: OS X 64-bit with Node.js 6.x

Found bindings for the following environments:
  - OS X 64-bit with Node.js 4.x

This usually happens because your environment has changed since running `npm install`.
Run `npm rebuild node-sass` to build the binding for your current environment.
    at Object.<anonymous> (/Users/user-name/sitedata/node_modules/gulp-sass/node_modules/node-sass/lib/index.js:15:11)
    at Module._compile (module.js:570:32)
    at Module._extensions..js (module.js:579:10)
    at Object.require.extensions.(anonymous function) [as .js] (/Users/user-name/sitedata/node_modules/babel-register/lib/node.js:166:7)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.require (module.js:497:17)
    at require (internal/module.js:20:19)
    at Object.<anonymous> (/Users/user-name/sitedata/node_modules/gulp-sass/index.js:187:21)
```

英語がよく分かりませんが「バージョンアップ後の環境では node-sass がないよ」みたいな意味で良いでしょうかね。

メッセージの中に以下のように node-sass を rebuild するようにとの文言があります。

```
Run `npm rebuild node-sass` to build the binding for your current environment.
```

なので文言通りに node-sass を rebuild します。

```
npm rebuild node-sass
```

その後に gulp を再度実行すると正常に作動しました。
