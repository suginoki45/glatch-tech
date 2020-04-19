---
path: "/update-netlify-nodejs"
tags: ["Netlify", "Node.js"]
date: 2020-04-03
title: Netlifyのデプロイ時にインストールされるNode.jsのバージョンを指定する
description: Netlifyのデプロイ時にインストールされるNode.jsのバージョンを指定するをご紹介します。
---

Gatsbyで作った当ブログを久しぶりに更新した際にNetlifyのビルドが失敗する現象が発生しました。

## 失敗の原因
Netlifyの失敗したデプロイのログを見ると以下のようなメッセージが。

```shell
error gatsby@2.20.10: The engine "node" is incompatible with this module. Expected version ">=10.13.0".
```

Gastbyをビルドする際にNetlifyにNode.jsがインストールされるのですが、それがどうも古いバージョンのようで「使用しているNode.jsでは互換性がありません」とエラーが出ているようでした。10.13.0以上が必要とのこと。

確かにさらにログを見てみると下記のように現状は古いものが使用されていました。

```shell
Now using node v8.17.0 (npm v6.13.4)
```

したがって新しいバージョンのNode.jsをインストールするよう指定します。

## 手順

手順は簡単で`.nvmrc`を追加するだけ。  
プロジェクトルートで下記のコマンドをたたけば、使用しているNode.jsのバージョンが記述された`.nvmrc`が生成されます。

```shell
node -v  > .nvmrc
```

`.nvmrc`の中身を見てみると以下のようになっていると思います。

```shell
v12.16.1
```

これでNetlifyに指定したバージョンのNode.jsがインストールされます。
