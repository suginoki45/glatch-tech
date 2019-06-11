---
path: "/delete-archive-title-text-with-wordpress"
tags: ["WordPress"]
date: 2018-08-09
modified: 2019-06-11
title: WordPressで関数で出力したアーカイブタイトルの「アーカイブ：」を消す
description: WordPressでget_the_archive_title関数を使用すると出力されてしまう「アーカイブ：」の文字列を消す方法を紹介しています。
---

WordPress ではアーカイブタイトルを取得する get_the_archive_title()という関数があります。

とても便利な関数ですがデフォルトでは「アーカイブ：タイトル」のように前方に「アーカイブ：」という余計な文言が出力されてしまいます。

詳しくは以下のようにテンプレートごとに出力される文言は異なりますが、不要な場合も多いと思います。

## archive.php の場合

アーカイブ：タイトル

## category.php の場合

カテゴリー：タイトル

```php
add_filter( 'get_the_archive_title', function ($title) {
    if ( is_post_type_archive( 'custom-post-slag' ) ) {
		$title = post_type_archive_title( '', false );
	} elseif ( is_category() ) {
		$title = single_cat_title( '', false );
	} elseif ( is_tag() ) {
		$title = single_tag_title( '', false );
	}

    return $title;
});
```
