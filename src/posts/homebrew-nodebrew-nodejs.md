---
path: "/homebrew-nodebrew-nodejs"
tags: ["Homebrew", "nodebrew", "Node.js"]
date: 2020-04-19
title: HomebrewでnodebrewとNode.jsをインストールするまで
description: HomebrewでnodebrewとNode.jsをインストールするまでをご紹介します。
---

## 前提条件
Homebrewがインストールされている

## Homebrewでnodebrewをインストールする

###  1.nodebrewをインストールする

まずはHomebrew経由でnodebrewをインストールします。

```
$ brew install nodebrew
```

### 2.インストールの確認

次に無事にインストールできたかを確認します。

```
$ brew list
nodebrew
```
コマンドを叩いた後に`nodebrew`と出てくればインストールが成功しています。

### 3.セットアップ

無事にnodebrewをインストールできたら、次は下記コマンドでセットアップを行います。

```
$ nodebrew setup
Fetching nodebrew...
Installed nodebrew in $HOME/.nodebrew

========================================
Export a path to nodebrew:

export PATH=$HOME/.nodebrew/current/bin:$PATH
========================================
```

上記のメッセージが表示されれば無事にセットアップは完了します。
メッセージ中にpathの設定を行うよう言われているので行います。

```
 $ echo "export PATH=\$HOME/.nodebrew/current/bin:\$PATH" >> ~/.bash_profile
```

`.bash_profile`に記述したら設定を再読み込みさせます。

```
$ source ~/.bash_profile
```

以上でnodebrewのセットアップは完了です。

## nodebrewでNode.jsをインストールする
続いてNode.jsをインストールします。先ほどセットアップが完了したnodebrewでインストールします。

### 1.インストールする

今回は安定版をインストールします。

```
nodebrew install-binary stable
Fetching: https://nodejs.org/dist/v12.16.2/node-v12.16.2-darwin-x64.tar.gz
######################################################################## 100.0%
Installed successfully
```

上記のようにInstalled successfullyと表示されればインストール成功です。

###  2.使用するバージョンの指定
現状だとインストールは完了したものの、利用できる状態にはまだなっていません。
試しに下記のコマンドを叩いてみると、`current`が`none`となっているかと思います。
```
$ nodebrew ls
v12.16.2

current: none
```

そこでインストールしたNode.jsを使用できる状態にします。

```
nodebrew use stable
```

もう一度確認してみるとインストールしたNode.jsが設定されています。

```
$ nodebrew ls
v12.16.2

current: v12.16.2
```

以上でNode.jsが使用できるようになりました。