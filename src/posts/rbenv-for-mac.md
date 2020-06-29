---
path: "/rbenv-for-mac"
tags: ["Mac", "Ruby"]
date: 2018-08-22
modified: 2020-06-29
title: MacでrbenvをインストールしてRubyを管理する
description: MacでrbenvをインストールしてRubyを管理する方法を紹介しています。
---

複数のバージョンの Ruby を切り替えできたり、プロジェクト毎にバージョン指定できる rbenv を使ってRubyをインストールしたので方法を共有します。

## 前提条件
- Homebrew がインストール済みである

## 著者環境
|     環境    | バージョン |
| ---------- | --------- |
|  Mac OS X  |  10.14.6  |
|  Homebrew  |   2.4.0   |

## rbenv とは

Ruby のバージョン管理をおこなってくれるもの。

## インストール手順

Mac OS X の場合、HomeBrew によるインストールが良いです。

```shell
brew install rbenv ruby-build
```

### ruby-build とは

rbenv のプラグインで、異なるバージョンの Ruby をコンパイル・インストールしてくれる。

### インストール出来ない場合
権限の関係でインストールに失敗することがありました。その場合は`brew doctor`コマンドを実行して解決法を調べてみてください。

必要なパッケージをインストールしたら.bash_profile に初期化用スクリプトを書き込みます。

```shell
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
```

書き込みが終わったら以下の2つのコマンドを順に実行し、動作確認をします。

```shell
source ~/.bash_profile
rbenv --version
```

## rbenvでRubyをインストールする
rbenvのインストールと設定が終わったら、いよいよRubyをインストールします。以下のコマンドでインストール可能なRubyのバージョンが表示されます。

```shell{outputLines: 2-9}
rbenv install -l
2.5.8
2.6.6
2.7.1
jruby-9.2.11.1
maglev-1.0.0
mruby-2.1.0
rbx-4.15
truffleruby-20.1.0
```

リストの中からインストールしたいバージョンを選んで下記のコマンドを叩きます。

```shell
rbenv install 2.7.1
```

インストールが無事終わったら、`global`コマンドでインストールしたバージョンのRubyを指定します。

```shell
rbenv global 2.7.1
```

最後にRubyの`version`コマンドで指定したバージョンが表示されたら終了です。

```shell
ruby -v
```

## 新しいgemをインストールしたら
新しいgemをインストールした際、正常にインストールができたにも関わらず、コマンドをたたくと`command not found`と言われる場合があります。

rbenvを導入している場合、`rbenv rehash`コマンドをたたくと解消されます。

```
rbenv rehash
```

このコマンドをたたくとインストールしたgemが`~/.rbenv/shims/`以下に配置され無事に使えるようになりました。
