---
path: "/php-cs-fixer-for-vscode"
date: 2018-08-28
title: Visual Studio CodeでPHPを整形する
---

Visual Studio CodeでPHPの整形をしたかったので、PHP CS Fixerを使ってファイル保存時に整形する方法を解説します。

## 1.Visual Studio Code に php cs fixer をインストールする

まずはVisual Studio Codeにphp cs fixerをインストールします。

[php cs fixer - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=junstyle.php-cs-fixer)

## 2.PHP CS Fixer をダウンロードする

「えっさっきDLしたじゃん」と思うかもしれませんが、さっきインストールしたのはVisual Studio CodeでPHP CS Fixerを使えるようにするエクステンションで本体はこっちです。

[FriendsOfPHP/PHP-CS-Fixer: A tool to automatically fix PHP coding standards issues](https://github.com/FriendsOfPHP/PHP-CS-Fixer)

リンク先を見てもらうとわかるとおりダウンロード方法には何種類かありますが、今回はpharファイルをローカルにダウンロードする方法にしました。

ダウンロードしたら任意の場所に保存します。今回は下記の場所に保存しました。

```json
~/.vscode/php-cs-fixer-v2.phar
```

## 3.Visual Studio CodeでPHP CS Fixerの設定をする

`cmd + ,`　でユーザー設定ファイルを開き以下を追記します。

```json
  "php-cs-fixer.executablePath": "~/.vscode/php-cs-fixer-v2.phar",
  "php-cs-fixer.rules": "@PSR2",
  "php-cs-fixer.formatHtml": true,
  "php-cs-fixer.onsave": true
```

記述内容について簡単に説明します。

- `php-cs-fixer.executablePath` ダウンロードしたらPHP CS Fixerのpharファイルの保存場所を指定
- `php-cs-fixer.rules` PHP のコーディング規約
- `php-cs-fixer.formatHtml` PHP 内に記述されているhtmlも整形したい場合は`true`を
- `php-cs-fixer.onsave` 保存と同時に整形したい場合は`true`を

以上でファイル保存と同時に整形されるようになります。
