---
path: "/rbenv-for-mac"
date: 2018-08-22
title: 【2018年版】MacでrbenvをインストールしてRubyを管理する
---

複数のバージョンの Ruby を切り替えできたり、プロジェクト毎にバージョン指定できる rbenv を導入したのでメモ。

## rbenv とは

Ruby のバージョン管理をおこなってくれるもの。

## ruby-build とは

rbenv のプラグインで、異なるバージョンの Ruby をコンパイル・インストールしてくれる。

## Mac OS X の場合

Mac OS X の場合、HomeBrew によるインストールが良いです。

```
brew install rbenv ruby-build
```

必要なパッケージをインストールしたら.bash_profile に初期化用スクリプトを書き込みます。

```
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
```

書き込みが終わったら動作確認をします。

```
source ~/.bash_profile
rbenv --version
```
