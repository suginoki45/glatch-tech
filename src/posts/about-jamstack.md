---
path: "/about-jamstack"
tags: ["JAMstack"]
date: 2019-01-28
modified: 2019-06-11
title: JAMstackについてのメモ
description: JAMstackというサイト制作のアーキテクチャーについて調べたことをメモしています。
---

最近よく目にするJAMStackという新しいアーキテクチャーについてのメモ。

## JAMstackとは？
JAMstackとは下記3つベースとしたモダンなWeb開発のアーキテクチャー。

1. クライアントJavaScript
2. 再利用可能なAPI
3. 予めビルドされたMarkup

JAMstackは何か一つのプロダクトやサービス名を指す言葉ではない。なのでこれらを構成するツール群は多数存在するし、もしかしたら自分でも気づかないうちにJAMstackな開発を行っている人もいるかもしれない。

## JAMstackのメリット
JAMstackのメリットとしては[JAMstack | JavaScript, APIs, and Markup](https://jamstack.org/)を引用すると以下のような感じ。

- 高パフォーマンス
- 高セキュリティ
- 安価なスケールコスト
- 優れた開発体験

## JAMstackを実現するために必要なもの
JAMstackを実現するためのツール群をまとめてみた。まだまだあると思うけどパッと思い付くところでは以下のような感じ。

### ホスティング
- Netlify
- Firebase

### headlessCMS
JAMstackを構成する直接の要件ではないけど、JAMstackで開発するにあたっては必ずと言っていいほど使用されていて事実上の必須要件。

headlessCMSとはビュー部分を持たないCMSのことで、このheadlessCMSと後述するサイトジェネレータを組み合わせることでサイトを構築する。

- Netlify CMS
- Contentful
- Airtable
- WordPress REST API

その他のheadlessCMSは[headlessCMS | Top Content Management Systems for JAMstack sites](https://headlesscms.org/)というサイトにまとまっている。

### 静的サイトジェネレータ
「予めビルドされたMarkup」を手に入れるために静的サイトジェネレータが使用されます。JAMstackという文脈では下記のジェネレータがの名前を目にすることが多い。

- Gatsby
- Gridsome
- VuePress

その他のジェネレータは[StaticGen](https://www.staticgen.com/)というサイトにまとまっている。

## まとめ
個人的にはWordPressでフロントからバックエンドまで面倒見ていた案件をJAMstackに置き換えることができる場面があると思うので、引き続き色々ツールを触っていって実案件への導入を探ってみようと思う。
調べていく中でWordPress REST APIでデータを引っ張ってきて静的サイトジェネレータでビルドするというのは割と早く導入できそうだと思ったけどJAMstackではないか。

現在Gatsbyを触っていて今後ブログを作って公開したい。

参考
[JAMstack | JavaScript, APIs, and Markup](https://jamstack.org/)