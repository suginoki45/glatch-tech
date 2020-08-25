---
path: "/prettier-v2"
tags: ["Prettier"]
date: 2020-08-25
title: Prettier 2.0の変更点を確認する
description: Prettier 2.0の個人的に気になる変更点を確認し、備忘録として記事にしました。
---

Prettier 2.0の変更点で個人的に気になる点をまとめました。  
詳しくはPrettier公式のページをみていただければと思います。

[Prettier 2.0 “2020” · Prettier](https://prettier.io/blog/2020/03/21/2.0.0.html)

## デフォルト設定の変更
### trailingComma
`none` → `es5`

### arrowParens
`avoid` → `always`

### endOfLine
`auto` → `lf`

## CSS
### セレクタを小文字にしない

2.0以前は大文字で入力したセレクタは小文字に変換されていましたが、2.0からは入力したもの保持するよう変更になりました。

```css
/* Input */
Label {
}

/* Prettier 1.19 */
label {
}

/* Prettier 2.0 */
Label {
}
```

## SCSS
### map内でコメントを使用している時、最後のコメントにカンマが入らないようにする

2.0以前は`trailingComma`を`es5`に設定している場合、map内でコメントを使用していると最後のコメントにカンマが入ってしまっていたものが2.0で改善されています。

```scss
// Input
$my-map: (
  'foo': 1, // Comment
  'bar': 2, // Comment
);

// Prettier 1.19
$my-map: (
  "foo": 1,
  // Comment
    "bar": 2,
  // Comment,
);

// Prettier 2.0
$my-map: (
  "foo": 1,
  // Comment
    "bar": 2,
  // Comment
);
```

### 結合子の前後の空白が削除されてしまう挙動の改善

2.0以前は結合子の前後に空白を挿入していると削除されていましたが、2.0ではその挙動が改善されています。

```css
// Input
a {
  background-image: url($test-path + 'static/test.jpg');
}

// Prettier 1.19
a {
  background-image: url($test-path+"static/test.jpg");
}

// Prettier 2.0
a {
  background-image: url($test-path + "static/test.jpg");
}
```

以上、v2のアップデートの備忘録でした。  
その他の変更点については公式ブログでご確認ください。

[Prettier 2.0 “2020” · Prettier](https://prettier.io/blog/2020/03/21/2.0.0.html)
