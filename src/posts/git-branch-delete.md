---
path: "/git-branch-delete"
tags: ["git"]
date: 2019-06-09
modified: 2019-06-11
title: Gitで不要になったブランチ（ローカル・リモート共に）を削除する
description: Gitでローカルブランチ・リモートブランチの削除をする方法を紹介しています。
---

## ローカルブランチの削除

### ローカルブランチ一覧の表示
削除する前に存在するブランチの一覧を確認したい場合がある。その場合は下記のコマンドを叩く。

``` bash
git branch
```

### ローカルブランチの削除
`hoge`に削除したいブランチ名を記述し以下のコマンドを叩く。

``` bash
git branch --delete hoge
```

または

``` bash
git branch -d hoge
```

## リモートブランチの削除

### リモートブランチ一覧の表示

``` bash
git branch -a
```

または

``` bash
git branch --all
```

### リモートブランチの削除
リモートブランチの削除の場合は省略記法`-d`が使用できないことに注意。

``` bash
git push origin --delete hoge
```