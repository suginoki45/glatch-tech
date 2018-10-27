---
title: カスタム投稿でもbogoを使えるようにする
date: 2018-08-05 18:51:08
categories:
- Web制作
tags:
- WordPress
---

WordPressの翻訳プラグインbogoはデフォルトではカスタム投稿に対応していないので、対応させたいカスタム投稿を以下のように記述します。

```php
add_filter( 'bogo_localizable_post_types', function( $localizable ) {
    $localizable[] = ‘カスタム投稿のスラッグ’;
    return $localizable;
});
```