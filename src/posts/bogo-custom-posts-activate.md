---
path: "/bogo-custom-posts-activate"
date: 2018-08-05
title: カスタム投稿でもbogoを使えるようにする
---

WordPressの翻訳プラグインbogoはデフォルトではカスタム投稿に対応していないので、対応させたいカスタム投稿を以下のように記述します。

```php
add_filter( 'bogo_localizable_post_types', function( $localizable ) {
    $localizable[] = ‘カスタム投稿のスラッグ’;
    return $localizable;
});
```