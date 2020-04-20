---
path: "/how-to-vccw"
tags: ["VCCW"]
date: 2020-04-20
title: WordPressのローカル環境をVCCWで作る方法
description: WordPressのローカル環境をVCCWで作る方法をご紹介します。
---

## 前提条件
OS: Mac OS Mojave 10.14.6

## VCCWとは？
そもそもVCCWとは何なのかについて簡単に触れておきます。  
VCCWとはVagrant、Chef、CentOS、WordPressの頭文字を取ったものでVirtualBoxという仮想環境上で動作するWordPress環境のことです。

## VCCWのメリット・デメリット
### メリット
- 複数のWordPressの構築・破棄が簡単
- 本番環境との同期も簡単

### デメリット
- ターミナルの操作が必要
- 関連する技術に対してある程度知識が必要
- 1つのサイトごとに1つの仮想環境を作るのでそれなりのパワーのマシンが必要

導入するには技術的な障壁が多少ありますが、そこを越えてしまえば複数の開発環境を簡単に作ったり捨てたりできるので、WordPress案件を沢山こなす人にはメリットがあると思います。

## VCCWの環境構築方法
### 1.VirtualBoxをインストール
[Oracleのサイト](https://www.oracle.com/virtualization/technologies/vm/downloads/virtualbox-downloads.html)より環境に合うものをダウンロードし、インストールします。


### 2.Vagrantをインストール
[Vagrant公式サイト](https://www.vagrantup.com/downloads.html)より環境に合うものをダウンロードし、インストールします。  

インストール後に下記コマンドを入力し、バージョンが表示されたら無事インストール完了です。

```
$ vagrant -v 
Vagrant 2.2.7
```

### 3.Vagrantのプラグインをインストール
Vagrantのプラグインである「vagrant-hostsupdater」をインストールします。
vagrant-hostsupdaterはhostファイルを自動的に書き換えて、Vagrantを切断すると元に戻してくれるプラグインです。

```
$ vagrant plugin install vagrant-hostsupdater
Installing the 'vagrant-hostsupdater' plugin. This can take a few minutes...
Fetching: vagrant-hostsupdater-1.1.1.160.gem (100%)
Installed the plugin 'vagrant-hostsupdater (1.1.1.160)'!
```

### 4.boxイメージをダウンロード


```
$ vagrant box add vcci-team/xenial64
```


### 5.VCCWをダウンロード
[VCCW公式サイト](http://vccw.cc/)からzipファイルをダウンロードし、開発環境を構築したい任意のディレクトリに設置します。

## 6.VCCWを起動
ターミナルで以下のコマンドを叩きます。
```
vagrant up
```
初回の起動は数分〜数十分かかることがあります。
無事終わると`http://vccw.test`にアクセスし、WordPressのデフォルトテーマが設定されたTOPページが表示されたら構築完了です。 
