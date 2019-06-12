---
path: "/how-to-editorconfig"
tags: ["EditorConfig"]
date: 2018-11-16
modified: 2019-06-12
title: EditorConfigの書き方
description: 異なるエディタ・IDE間でもコーディングスタイルの統一ができるEditorConfigの設定方法を紹介しています。
---

<a href="https://editorconfig.org/" target="_blank">EditorConfig</a>を導入したので、備忘録的に調べたことをメモしておきます。

## EditorConfigとは

<a href="https://editorconfig.org/" target="_blank">公式サイト</a>の冒頭をGoogle翻訳にかけて引用するとこんな感じです。

> EditorConfigは、開発者がさまざまなエディタとIDE間で一貫したコーディングスタイルを定義し、維持するのに役立ちます。 EditorConfigプロジェクトは、コーディングスタイルを定義するためのファイルフォーマットと、エディタがファイルフォーマットを読み込んで定義されたスタイルに従うことを可能にするテキストエディタプラグインのコレクションで構成されています。 EditorConfigファイルは読みやすく、バージョン管理システムでうまく動作します。

複数の開発者、エディタ、IDE間でインデントなどのフォーマットを統一できてチームで開発するときなどに有効です。

## 使い方
使い方は簡単で、プロジェクトのルートに`.editorconfig`というファイルを作成し、その中に設定を記述していくだけ。ネイティブでEditorConfigをサポートしているエディタであれば、`.editorconfig`があると自動的に読み取ってくれて設定した内容が適用されます。

ネイティブでサポートしていないエディタも大抵の場合プラグインが用意されているので、プラグインをインストールして問題なく使用できます。
対応状況は下記を参照してください。

<a href="https://editorconfig.org/#download" taget="_blank">Download a Plugin</a>

## .editorconfigファイルの中身について
実際どんな記述をするのかについては、<a href="https://editorconfig.org/#example-file" taget="_blank">公式サイト</a>のものを引用して解説します。

```
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,py}]
charset = utf-8

# 4 space indentation
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified)
[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

### 対象ファイルの設定

対象となるファイルは下記のセレクタを使用して指定できます。

|セレクタ|値|
|---|---|---|
|`*`|'/'以外の任意の文字列|
|`**`|任意の文字列|
|`?`|任意の1文字|
|`[name]`|任意の名前`name`に一致するもの|
|`[!name]`|任意の名前`name`に一致しないもの|
|`{s1,s2,s3}`|任意の名前`s1,s2,s3`のいずれかに一致するもの|
|`{num1..num2}`|`num1`と`num2`の間の任意の整数に一致するもの|

### 設定可能な項目

設定可能な項目は下記の通り。

|プロパティ|値|内容|
|---|---|---|
|`root`|ルートであることを明示するためのものです。これを設定しておかないとルートまで辿ってしまうので、基本的には`true`としておくことが必須だと思います。|`true` or `false`|
|`indent_style`|インデントのスタイルを`tab`か`space`で設定します。|`tab` or `space`|
|`indent_size`|インデントを半角スペースで数えていくつ分とるかを設定します。|整数|
|`tab_width`|タブでインデントする場合、いくつ分のタブのインデントを取るかを設定します。しかしここはデフォルトでは`indent_size`の値になり、通常は指定する必要はありません。|整数|
|`end_of_line`|改行コードの種類を設定します。|`lf` or `cr` or `crlf`|
|`charset`|文字コードを設定します。|`latin1` or `utf-8` or `utf-8-bom` or `utf-16be` or `utf-16le`|
|`trim_trailing_whitespace`|行末の空白を削除するかどうかを設定します。|`true` or `false`|
|`insert_final_newline`|最終行に空行を入れるかどうかを設定します。|`true` or `false`|


## おわり
EditorConfigを使って開発以外のところで消耗しないようにしましょう。