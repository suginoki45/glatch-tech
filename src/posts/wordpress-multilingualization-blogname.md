---
path: "/wordpress-multilingualization-blogname"
date: 2018-08-09
title: WordPressのサイト名やタグラインを多言語化する
---

WordPress には多言語化するための便利な関数が装備されています。[\_\_()](https://wpdocs.osdn.jp/%E9%96%A2%E6%95%B0%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9/_2)や[\_e()](https://wpdocs.osdn.jp/%E9%96%A2%E6%95%B0%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9/_e)がそれです。これらは翻訳されたテキストを取得あるいは表示するための関数です。

この翻訳関数をサイト名やタグラインに適用する方法が以下です。

## サイト名

```php
add_filter( 'option_blogname', function( $blogname ) {
    return __($blogname, ‘theme-name’);
} );
```

## タグライン

```php
add_filter( 'option_blogdescription', function( $blogdescription ) {
    return __($blogdescription, ‘theme-name’);
} );
```
