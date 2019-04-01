---
path: "/if-has-post-thumbnail"
date: 2018-08-09
title: WordPressでアイキャッチの有無で条件分岐する
---

WordPress でアイキャッチの有無を確認し、アイキャッチがある場合はアイキャッチを、ない場合はない時用の画像を出力する想定のコードです。

```php
if ( has_post_thumbnail() ) {
    the_post_thumbnail();
} else {
    echo '<img src="/img/no-image.png" />';
}
```
