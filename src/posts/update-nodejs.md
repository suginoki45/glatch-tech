---
path: "/update-nodejs"
tags: ["Node.js", "nodebrew"]
date: 2020-04-09
title: nodebrewで入れたNode.jsとnpmをアップデートする
description: nodebrewで入れたNode.jsとnpmをアップデートする手順をご紹介します。
---

## 前提条件
Homebrewでnodebrewがインストールされている

## 手順

### Node.jsのアップデート
まずは下記のコマンドでインストールされているNode.jsのバージョンを確認します。

```shell
nodebrew list
v12.13.1

current: v12.13.1
```

続いてアップデートをします。

```shell
nodebrew install-binary stable
```

成功すると以下のようなメッセージが出ます。

```shell
############## 100.0%
Installed successfully
```

再度バージョンを確認すると、新しいバージョンのNode.jsが増えているはずです。

```shell
nodebrew list                 
v12.13.1
v12.16.1

current: v12.13.1
```

この時点だとまだインストールが完了しただけで、古いバージョンのものが選択されたままになっています。

そこで次のコマンドでインストールした最新版のNode.jsを使用できるようにします。

```shell
nodebrew use stable
```

以上でインストールしたNode.jsを使用できる状態になりました。  
最後に下記のコマンドでバージョンを確認してみます。

```shell
node -v
v12.16.1
```


### npmのアップデート

まず現在のnpmのバージョンを確認しておきます。

```
npm -v
6.13.4
```

続いて以下のコマンドでアップデートします。

```
npm update -g npm
```

最後に再度バージョンの確認をして、変わっていたら無事アップデート完了です。

```
npm -v           
6.14.4
```