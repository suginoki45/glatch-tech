---
path: "/homebrew-cask-deprecate"
tags: ["Homebrew"]
date: 2021-01-30
modified: 2021-10-25
title: Homebrewでcaskを使ったらエラーになった話
description: Homebrewでcaskコマンドを実行した際にエラーとなった原因と解決法を紹介しています。
---

## 環境

- OS: macOS Catalina 10.15.7
- Homebrew: 2.7.7

## 何が起こったのか

MacをクリーンインストールしたのでVSCodeをHomebrewでインストールしようとしたところ、下記のようなエラーが表示されました。

```bash
suginoki45$ brew cask install visual-studio-code

Error: Calling brew cask install is disabled! Use brew install [--cask] instead.
```

## なぜ起こったのか

`cask`コマンドが2.7より削除されたようです。

[https://github.com/Homebrew/brew/pull/9403](https://github.com/Homebrew/brew/pull/9403)

## 解決法

エラーメッセージにもある通り、下記のように`install`コマンドに`cask`オプションをつけた形で実行できます。

```bash
brew install --cask visual-stuio-code
```