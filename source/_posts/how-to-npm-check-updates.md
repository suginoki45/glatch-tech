---
title: npmのパッケージをアップデートするnpm-check-updatesの使い方
date: 2018-11-12 13:43:35
tags: npm
---

npmでインストールしたパッケージをアップデートするにはどうするのか良いかを調べていたところ、便利なパッケージを見つけました。

## 結論：npm-check-updatesを使おう
結論から言うと<a href="https://github.com/tjunnone/npm-check-updates" target="_blank">npm-check-updates</a>というパッケージを使うのが便利でした。まずはnpm-check-updatesをグローバルにインストールします。

```
npm install -g npm-check-updates
```

## npm-check-updatesの基本的な使い方

npm-check-updatesのインストールが完了すると以下の`ncu`コマンドが使用できるようになります。
`ncu`コマンドを実行すると下記のような感じでアップデートがあるパッケージを教えてくれます。

```
$ncu

  gulp-autoprefixer  ^3.1.0  →  ^6.0.0
  gulp-connect       ^2.3.1  →  ^5.6.1
  gulp-cssmin        ^0.1.7  →  ^0.2.0
  gulp-uglify        ^1.5.1  →  ^3.0.1

The following dependencies are satisfied by their declared version range, but the installed versions are behind. You can install the latest versions without modifying your package file by using npm update. If you want to update the dependencies in your package file anyway, run ncu -a.

 eslint                   ^5.8.0  →   ^5.9.0
 eslint-config-prettier   ^3.1.0  →   ^3.3.0
 prettier                ^1.14.3  →  ^1.15.2

```

「The following〜」というテキスト以前のパッケージはメジャーバージョンの更新があるパッケージで、以後のパッケージはマイナーバージョンの更新があるもの。

`ncu`コマンドを叩いただけではアップデートの確認をするだけで、`package.json`もパッケージも更新されていない点に注意。以下のコマンドを叩くと`package.json`が更新されます。

```
ncu -u
```

これで`package.json`が更新されます。しかしこの時点でも更新されたのはまだ`package.json`だけで実際のパッケージは更新されていないので、最後に以下のコマンドを叩くことによってパッケージが更新されます。

```
npm update
```

以上でパッケージが更新完了です。

## おまけ：便利なオプション

### パッケージ名の指定

`package.json`の更新は下記のようにパッケージ名を指定して更新することも可能です。

```
ncu -u パッケージ名
```

### マイナーアップデートも含めて更新

`-u`だとメジャーアップデートがあるパッケージのみ更新されるます。マイナーアップデートも含めたい場合は`-a`を使用します。

```
ncu -a
```

### devDependenciesだけ、dependenciesだけを更新

`devDependencies`だけ、あるいは`dependencies`だけを更新することが可能です。

```
// devDependenciesだけを更新
ncu -d
```

```
// dependenciesだけ更新
ncu -p
```

その他オプションはgithubをご確認ください。

<a href="https://github.com/tjunnone/npm-check-updates" target="_blank">tjunnone/npm-check-updates</a>