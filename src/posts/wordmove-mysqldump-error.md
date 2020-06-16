---
path: "/wordmove-mysqldump-error"
tags: ["Wordmove", "MySQL"]
date: 2020-06-16
title: Wordmoveでデータベースを同期する際に発生したエラーとその対処法
description: Wordmoveでデータベースを同期を試みた際に発生したエラーとその対処法をまとめています。
---

Wordmoveでデーターベースを引っ張ってこようとした際に以下のようなエラーが発生しました。

```bash
mysqldump: Couldn't execute 'SELECT COLUMN_NAME, JSON_EXTRACT(HISTOGRAM, '$."number-of-buckets-specified"') FROM information_schema.COLUMN_STATISTICS WHERE SCHEMA_NAME = 'local' AND TABLE_NAME = 'wp_commentmeta';': Unknown table 'COLUMN_STATISTICS' in information_schema (1109)
```

## 原因
MySQL8.0系の仕様変更によって発生するものらしいです。MySQLをアップデートしたことによって発生したものということがわかりました。

## 対応方法
mysqldump_optionsを以下のように設定すると無事データベースを引っ張れるようになりました。

```yml
local:
  vhost: "http://example.local"
  wordpress_path: "wordpress" # use an absolute path here

  database:
    name: "wordpress"
    user: "wordpress"
    password: "wordpress"
    host: "localhost"
    charset: "utf8"
    mysqldump_options: "--column-statistics=0"
```

## 参考
[MySQL クライアントを 8.x にアップデートしたときに WP-CLI の DB コマンドでエラーが出た時の対処法](https://qiita.com/miya0001/items/e0625a160e3a36f18e1f)
