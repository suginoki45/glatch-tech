---
path: "/make-develop-wordpress-environment-with-docker-compsoe"
tags: ["WordPress", "Docker"]
date: 2018-11-22
modified: 2019-06-12
title: Docker ComposeでWordPressの開発環境を作る
description: Docker ComposeでWordPressの開発環境を作る手順を紹介しています。
---

WordPressを開発する時、開発環境を何で作っていますか？
僕はここ数年は主にVCCW+Vagrant、最近はLocal by Flywheelなんかを使ったりしていました。特にVCCWは環境構築も簡単で本番環境へのデプロイもwordmoveコマンド一発で完了するので、とても便利だなあと思って使っていました。

しかし最近DockerというアプリケーションがWordPressのみならず多くの開発現場で利用されてるみたいです。なのでそろそろ触っておこうと思いまして、今回Docker Composeを使ってWordPressの環境を作ってみたので備忘録を残しておきます。

そもそもDockerって？Docker Composeって？
初めは「Dockerってやつ使ってみるか〜」と思って色々調べてたら、どうもDocker Composeってやつの方が便利そうってなり、今回はDocker Composeを使うことにしました。Dockerをすっ飛ばしてDocker Composeから入ったので、Dockerと比べてどこが便利なのかという点についてはイマイチわかっていません。

で、そもそもDocker Composeとは何なのかということについて、<cite>さくらインターネット</cite>さんの記事に分かりやすい説明がありましたので引用させていただきます。

> Docker Composeは、複数のコンテナで構成されるアプリケーションについて、Dockerイメージのビルドや各コンテナの起動・停止などをより簡単に行えるようにするツールです。

どうもDockerだと複数のコンテナを起動するのは手順が複雑になるようです。WordPressの場合、WordPressとMySQLの2つのコンテナを起動する必要があります。このような問題を解決できるのがDocker Composeです。何となく分かったところで早速試してみましょう。

## はじめに
今回作った環境はGitHubに上げています。

<a href="https://github.com/suginoki45/wordpress-docker-compose" target="_blank">suginoki45/wordpress-docker-compose</a>

## Dockerをインストールする

まずはDockerをインストールします。Dockerの公式のGet Startedページにアクセス。

<a href="https://www.docker.com/get-started" target="_blank">https://www.docker.com/get-started</a>

自分の環境にあったDockerをインストールします。僕はMacを使っているので、<a href="https://store.docker.com/editions/community/docker-ce-desktop-mac" target="_blank">Download for Mac</a>を選択。

するとdocker storeというサイトに遷移し、「Please Login To Download」というボタンがあるのでクリック。どうもdocker storeのアカウントが必要なようで、非常に面倒ですが初めての人はアカウントを作成後にログインしてダウンロードします。

ダウンロードしたら他のアプリと同じようにアプリケーションフォルダにコピー。ダブルクリックしてDockerを起動して、指示通りに進むと右上のメニューバーにDockerのアイコンが出現し、クリックすると下記のようなウインドウが現れます。

<img src="/images/docker-menubar-screen-for-mac.png" width="300" alt="Dockerを起動した際にメニューバーに出現する画面">

このウインドウの画面から先ほど登録したアカウント情報を入力してログインします。これでDockerの準備は完了です。DockerをインストールすればDocker Composeも使えるようになります。試しに下記のコマンドを実行してみてください。

```shell
$ docker-compose -v
docker-compose version 1.22.0, build f46880f
```

Docker Composeのバージョン情報が表示されれば、正常にインストールが完了しています。

## ディレクトリを作成
docker-composeで構築するWordPressを格納するディレクトリを作成します。今回僕は`wordpress-docker-compose`というディレクトリを作成しました。この中にDocker ComposeでWordPressの開発環境を構築しようと思います。

## WordPressとMySQLの環境を構築
ディレクトリを作成したら次に`docker-compose.yml`というファイルを作成します。このファイルの中にコンテナ情報を記述していき、環境を構築します。

```yml
version: "2"
services:
    db:
        image: mysql:5.7
        env_file: .env
        volumes:
            - db-data:/var/lib/mysql
    wordpress:
        image: wordpress:latest
        ports:
            - "9000:80"
        depends_on:
            - db
        environment:
            WORDPRESS_DB_HOST: "db:3306"
        env_file: .env
volumes:
    db-data:
```

ファイル内の設定項目については<a href="http://docs.docker.jp/compose/compose-file.html" target="_blank">公式リファレンス</a>があるのでそちらをご確認ください。一部抜粋して設定項目について下記に補足します。

### image
`latest`と指定すれば最新のものが使用されます。MySQLはサーバーによって利用できるバージョンが限られていたりするので、今回は明示的にバージョンを指定してみました。

### env_file
今回はWordPressとMySQLの環境変数を`.env`というファイルに外出しして`env_file`という項目に設定しています。`environment`という項目に直接書くこともできますが、セキュリティ面を考慮して別ファイルに管理、git管理対象外とする想定です。

ちなみにymlファイルのインデントはタブではなくスペースで取ります。タブだとDocker起動時にエラーとなりますので気を付けてください。

## Docker Composeを実行
`docker-compose.yml`の作成が終了したらDocker Composeを実行してみます。

```shell
$ docker-compose up -d
```

<a href="http://localhost:9000" target="_blank">http://localhost:9000</a>をアクセスしてみるとWordPressの構築が完了していることが確認できます。

## ホストのテーマ開発ディレクトリをコンテナ内に同期させる
これがDockerのおすすめポイントなのですが、ホストマシンの任意のディレクトリをコンテナ内のディレクトリとして認識させる機能があります。下記のように`ホストの相対パス:コンテナの絶対パス`の形式で指定すると、ホスト側のテーマディレクトリをコンテナ内にマウントさせることができます。

```yml
version: "2"
services:
    db:
        image: mysql:5.7
        env_file: .env
        volumes:
            - db-data:/var/lib/mysql
    wordpress:
        image: wordpress:latest
        ports:
            - "9000:80"
        depends_on:
            - db
        environment:
            WORDPRESS_DB_HOST: "db:3306"
        env_file: .env
        volumes:
            - ./themes/my_theme:/var/www/html/wp-content/themes/my_theme
volumes:
    db-data:
```

こうすることでテーマの開発環境が構築できます。ホスト側のプロジェクトフォルダ内はWordPress本体のファイルが一切なく、下記のようにDocker関連のファイルとテーマファイルのみになるのでスッキリしています。

```
root
├.env
├docker-compose.yml
└themes
    └my_theme
```

以前まで悩みの種だったWordPressのgit管理もこれならルートからまるっと管理できる。いや、以前もWordPress本体ごとgitに放り込んでしまっていたけど…。


## おわり
以上で開発環境ができました。これまで使っていたVCCWやLocal by Flywheelと比較すると動作はかなり軽快な印象。そして構成が全てコードで記述されているので、バージョン管理と非常に相性が良く、複数人での開発にも力を発揮しそうです。

もう少し触ってみて理解を深めようと思います。

### 参考サイト
<a href="https://tech.recruit-mp.co.jp/infrastructure/post-11266/" target="_blank">docker-compose を使って WordPress テーマ開発環境を構築しよう &#8211; PSYENCE:MEDIA</a>

<a href="http://docs.docker.jp/index.html" target="_blank">Docker ドキュメント日本語化プロジェクト &mdash; Docker-docs-ja 17.06.Beta ドキュメント</a>
