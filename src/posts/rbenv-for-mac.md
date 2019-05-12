---
path: "/rbenv-for-mac"
tags: ["Mac", "Ruby"]
date: 2018-08-22
modified: 2019-04-17
title: MacでrbenvをインストールしてRubyを管理する
---

複数のバージョンの Ruby を切り替えできたり、プロジェクト毎にバージョン指定できる rbenv を導入したのでメモ。

## rbenv とは

Ruby のバージョン管理をおこなってくれるもの。

## ruby-build とは

rbenv のプラグインで、異なるバージョンの Ruby をコンパイル・インストールしてくれる。

## Mac OS X の場合

Mac OS X の場合、HomeBrew によるインストールが良いです。

```shell
brew install rbenv ruby-build
```

必要なパッケージをインストールしたら.bash_profile に初期化用スクリプトを書き込みます。

```shell
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
```

書き込みが終わったら動作確認をします。

```shell
source ~/.bash_profile
rbenv --version
```

## 新しいgemをインストールしたら
新しいgemをインストールした際、正常にインストールができたにも関わらず、コマンドをたたくと`command not found｀だと怒られた。

rbenvを導入している場合、`rbenv rehash`コマンドをたたくする必要がある。

```
rbenv rehash
```

このコマンドをたたくとインストールしたgemが`~/.rbenv/shims/`以下に配置され無事に使えるようになった。