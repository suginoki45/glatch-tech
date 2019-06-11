---
path: "/breadcrumb-navxt-categories-hide"
tags: ["WordPress"]
date: 2018-08-08
modified: 2019-06-11
title: Breadcrumb NavXTで特定のカテゴリを非表示にする
description: WordPressのパンくずを設定できるプラグインであるBreadcrumb NavXTで特定のカテゴリを非表示にする方法を紹介しています。
---

WordPress のパンくずリストプラグインである[Breadcrumb NavXT](https://ja.wordpress.org/plugins/breadcrumb-navxt/)で特定のカテゴリを非表示にするカスタマイズの方法です。

```php
add_action( 'bcn_after_fill', function ( $breadcrumb ) {
    if ( count($breadcrumb->trail) > 0 ) {
        for ( $i = 0; $i < count($breadcrumb->trail); $i++ ) {
            if ( '非表示にしたいカテゴリ名' == $breadcrumb->trail[$i]->get_title() ) {
            	$breadcrumb->trail[$i]->set_template( '' );
            }
        }
    }
    return $breadcrumb;
} );
```

以下の記事を参考にさせていただきました。
[WordPress のパンくずナビゲーション（Breadcrumb NavXT）をカスタマイズする](http://notnil-creative.com/blog/archives/981)
