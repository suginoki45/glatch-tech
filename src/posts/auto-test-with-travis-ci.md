---
path: "/auto-test-with-travis-ci"
date: 2018-11-05
title: Travis CIでWordPressテーマのテストとデプロイを自動化できるようにする 〜テスト編
---

[前回の記事](/auto-deploy-with-travis-ci/)でTravis CIでWordPressテーマを自動で`release`ブランチにデプロイする方法を書きました。
今回はコードがWordPressのコーディング規約に沿っているかをテストできるようにします。

## PHPCSとWordPress Coding Standarsの導入
ここではWordPressが規約通りにコーディングできているかどうかをテストする方法を紹介します。

WordPressのコーディング規約チェックには<a href="https://github.com/squizlabs/PHP_CodeSniffer" target="_blank">PHPCS</a>を使用します。PHPCS（PHP_CodeSniffer）とは指定したコーディング規約に準拠しているかどうかをチェックしてくれるツールです。
そして指定するコーディング規約というのが<a href="https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards" target="_blank">WordPress Coding Standards</a>というWordPressのコーディング規約です。

導入にはPHPCSとWordPress Coding Standardsのダウンロードが必要です。ダウンロード方法はいくつかありますが、今回はComposerでダウンロードします。Composerが導入済みの想定で解説しますので、未導入の方はググってもらえれば沢山情報が出てくるので、そちらを参照願います。
まず`composer.json`をファイルを作成して、下記の通りに記述します。

```json
{
  "require-dev": {
    "squizlabs/php_codesniffer": "*",
   "wp-coding-standards/wpcs": "*"
  }
}

```

次に下記のコマンドをたたくと`composer.json`に記述したパッケージがインストールされます。

```shell
composer install
```

インストールが終わると、`composer.lock`と`vendor`というディレクトリが追加され、下記のようなディレクトリ構成になっていると思います。

```
(プロジェクトルート)/
  ├ composer.json
  ├ composer.lock  
  └ vendor/
```

各ディレクトリの内容は以下です。

|値|内容|
|---|---|
|composer.json|インストールしたいパッケージの一覧の他、コマンドの設定などを記述する
|composer.lock|`composer.json`でインストールしたいパッケージに必要なパッケージの一覧
|vendor|インストールしたパッケージが格納されたディレクトリ

念のため下記のコマンドをたたいて、PHPCSがインストールされたかを確認してみましょう。

```shell
phpcs --version
```

バージョン情報が表示されたらインストールは完了です。

## composer.jsonにPHPCSのコマンドを設定
次に`composer.json`にPHPCSを動かすためのコマンドを設定します。直接PHPCSコマンドをたたいても良いのですが、Composerに設定しておくと長いコマンドをたたかなくて良いので便利です。
先ほどの`composer.json`に下記を追加します。

```json
"scripts": {
  "test": [
    "./vendor/bin/phpcs --config-set installed_paths `pwd -P`/vendor/wp-coding-standards/wpcs",
    "./vendor/bin/phpcs -p -s -v -n . --standard=./phpcs.xml --extensions=php"
  ]
}
```

3行目がWordPress Coding Standardsの指定、4行目がPHPCSを動かすためのコマンドです。

これで以下のコマンドからPHPCSを動かすことができます。

```shell
composer test
```

## Travis CI側の設定
最後にTravis CIにテストのコマンドを書きます。`.travis.yml`に設定を記述します。<a href="/auto-deploy-with-travis-ci/">デプロイ編の記事</a>で紹介した`.travis.yml`に追記しました。

```yml
language: php

php:
  - '7'

branches:
  only:
  - master

cache:
  directories:
  - node_modules
  - vendor

install:
  - nvm install 8

before_script:
  - npm install
  - composer install

script:
  - npm run build
  - ls -la style.css
  - composer test

deploy:
  provider: script
  script: bash ./bin/deploy.sh
  skip_cleanup: true
  on:
    branch: master
    php: 7

env:
  global:
  - GIT_COMMITTER_NAME=Githubのアカウント名
  - GIT_COMMITTER_EMAIL=Githubで使っているメールアドレス
  - GIT_AUTHOR_NAME=リポジトリのオーサーのアカウント名
  - GIT_AUTHOR_EMAIL=リポジトリのオーサーのメールアドレス
  - secure: "トークンの文字列"
```

追記したのは13、20、25行目のComposerに関する記述です。

|値|内容|
|---|---|
|vendor|キャッシュさせたいディレクトリ|
|composer install|Composerのモジュールをインストール|
|composer test|テストを走らせる|


以上でTravis CIを使用したテストの設定が終了しました。これで`master`ブランチにプッシュする度にテストが実行されます。

## おまけ：自動整形を利用する
PHPCSを実行するとエラー個所を検出してくれますが、修正などはしてくれません。そこで自動修正を行ってくれるPHPCBFを使用しましょう。
PHPCBFとはPHP Code Beautifier and Fixerの略で指定したコーディング規約に基づいて整形を行ってくれるコマンドです。PHPCSをダウンロードするとPHPCBFも一緒に使えるようになります。

PHPCBFも`composer.json`に記述しておいて使用できるようにしておくと楽です。

```json
"scripts": {
  "phpcbf": [
    "./vendor/bin/phpcbf -p -s -v -n . --standard=./phpcs.xml --extensions=php"
  ]
}
```