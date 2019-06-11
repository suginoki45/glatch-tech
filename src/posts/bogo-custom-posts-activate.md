---
path: "/bogo-custom-posts-activate"
tags: ["WordPress"]
date: 2018-08-05
modified: 2019-06-11
title: カスタム投稿でもbogoを使えるようにする
description: WordPressの多言語化プラグインのBogoでデフォルトでは対応していないカスタム投稿でも使用できるようにする方法を紹介しています。
---

WordPressの翻訳プラグインbogoはデフォルトではカスタム投稿に対応していないので、対応させたいカスタム投稿を以下のように記述します。

```php
add_filter( 'bogo_localizable_post_types', function( $localizable ) {
    $localizable[] = ‘カスタム投稿のスラッグ’;
    return $localizable;
});
```