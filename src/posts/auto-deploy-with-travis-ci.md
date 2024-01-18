---
path: "/auto-deploy-with-travis-ci"
tags: ["Travis CI"]
date: 2018-10-18
modified: 2019-06-11
title: Travis CIでWordPressテーマのテストとデプロイを自動化できるようにする 〜デプロイ編
description: Travis CIを使用してWordPressテーマをGitHubのmasterブランチへのpushすると、ビルドしてreleaseブランチへのpushまでを自動で行ってくれる方法を紹介しています。
---

現在WordPressテーマを開発しており、開発したテーマをGithubで管理しているのですが、ゆくゆくは公式テーマとして申請も行いたいと思っているので、品質の担保のためにテストを導入する必要があると思い至りました。

そこでTravis CIというサービスを利用して、Githubにプッシュした際にテスト→問題なければビルドしてリリースといった一連の作業の自動化にチャレンジしてみました。

いざ触ってみると中々上手く行かずに四苦八苦。なのでとりあえずテストはひとまず置いておいて、

- masterブランチへプッシュ
- 開発用ファイルを除いた必要なものだけをビルド
- releaseブランチへプッシュ

という手順を行うことにしました。

ただビルドしてプッシュしているだけなのでCIとは言い難いですが、CI導入の第一段階としてこちらの設定について解説します。

## ビルドタスクを用意する
まずはリリース用のファイル群をビルドするタスクを作ります。今回はgulpを使用して用意します。

```javascript
const gulp = require('gulp');
const runSequence = require('run-sequence');
gulp.task('build', ['clean'], callback => {
  return runSequence(['scss', 'babel', 'img'], callback);
});
```

各タスクの詳しい内容は本記事の趣旨から外れるので割愛しますが、css、js、imgの各ファイルのビルドタスクを作り実行させています。

### gulpの並列/直列実行について
ちなみにgulpはデフォルトではタスクを並列実行します。しかし今回は一度ビルドしたファイルを出力するディレクトリ（例：dist）を削除する`clean`タスクを実行させてからビルドしたいので、並列実行だと期待する結果になりません。そこで上の例では並列/直列を制御できるrun-sequenceというモジュールを使用しています。
なおgulp4.0からは`gulp.series`、`gulp.parallel`で並列/直列を制御できるようになったので、既に4.0を使用している場合は`run-sequence`は不要です。

一度ビルドファイルを出力するディレクトリを削除する理由は、不要なファイルが混入してしまわないようにするためです。今回は`clean`タスクという名前にしました。タスクの内容は以下の通り。

```javascript
const del = require('del');
gulp.task('clean', callback => {
  return del('dist', callback);
});
```

## Travis CIとGithubリポジトリの連携を行う
[Travis CI](https://travis-ci.org/)のWebサイトにアクセスしてSign Upをクリック後、手順に従っていけばサインインが完了します。

その後、右上のアイコンから`settings`をクリックするとGithubのリポジトリ一覧が表示されるので、連携したリポジトリの右にあるラジオボタンを`ON`にすれば連携は完了です。

## アクセストークンを生成する
Travis CIからリポジトリにpushを行うにあたってアクセストークンが必要です。アクセストークンは下記から生成できます。

[https://github.com/settings/tokens](https://github.com/settings/tokens)

許可する権限は下記の画像の通り`public_repo`のみでOKです。

<img src="/images/github-access-token-settings-select-scopes.png" width="600" alt="Githubのアクセストークンの権限設定の画面">

※取得したトークンは無くさないよう大切に保管してください。

## .travis.ymlの設定を行う
連携が完了したら.travis.ymlというファイルを連携したリポジトリの直下に作ります。ここに設定を記述していきます。コミット時にこの設定ファイルのタスクが実行されるようになります。今回は下記のような感じになります。

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

install:
- nvm install 8

before_script:
- npm install

script:
- npm run build
- ls -la style.css

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

上から順に見ていきましょう。

### language
テストするファイルの言語を設定します。今回はWordPressテーマのテストを想定しているので`php`としました。

### branches
コミットした際にTravis CIを発火させるブランチを指定します。今回はmasterブランチを指定。

### cache
頻繁に更新されないコンテンツをキャッシュしてCIのスピードアップができるのがここです。例では`node_modules`を設定しています。キャッシュ機能を使用する場合は、各リポジトリの設定にある`Build pushed branches`を`ON`にする必要があります。

[Caching Dependencies and Directories - Travis CI](https://docs.travis-ci.com/user/caching/)

### install
Travis CIの実行に際して必要なものをインストールする設定をします。今回gulpを実行してファイルをビルドするのでNode.jsをインストールしておきます。例ではnvmというNode.jsを管理するアプリケーションを使用して最新のLTS版であるバージョン8をインストールしています。

### before_script
ここでは`npm install`を実行し、package.jsonに記載されたモジュールをインストールしています。

### script
`npm run build`はgulpを実行してファイルをビルドするタスクです。
`ls -la style.css`についてはよくわかってないです。

### deploy
`release`ブランチへプッシュする設定をここに記述します。各設定値の意味は以下。

|値|内容|
|---|---|
|provider|デプロイ先を設定。デプロイ可能なサービスは[Travis CIの公式ドキュメント](https://docs.travis-ci.com/user/deployment/)に記載があります。しかし今回はデプロイするのではなく別ブランチへのプッシュを行いたいので、この後に詳しく説明しますが、今回はデプロイ用のシェルスクリプトを使用してプッシュするので`provider`には`script`と記述します。|
|script|デプロイ用のシェルスクリプトの格納先設定。|
|skip_cleanup|いまいちわかっていません。`true`にすると`git stash`と同じ働きをするようですが、よくわからないので誰か教えていただけませんか。|
|on|特定の条件でデプロイするように発火の条件を設定できます。例では`master`ブランチにプッシュした時だけデプロイするよう設定しています。なので例えば開発用に`develop`というブランチがあった場合、`develop`ブランチにプッシュしてもデプロイはされません。`branches`のところに`develop`を指定すれば、テストは作動してもデプロイは作動させないといった設定も可能。|
|php|複数のバージョンをサポートするジョブの場合、指定したバージョンのジョブの時だけデプロイするように設定をするという認識なんですけど合ってるのでしょうか？[Travis CIの公式ドキュメント](https://docs.travis-ci.com/user/deployment/#examples-of-conditional-deployment)を読んでも英語力に乏しいので誰か教えていただけますと幸いです。|

### env
環境変数を設定するキーです。githubのアカウント名とかメールアドレスなんかも設定していますが、必須なものは`secure`です。ここには取得したアクセストークンを設定します。取得したアクセストークンを下記のコマンドで暗号化します。

```yml
travis encrypt GH_TOKEN=ここに取得したアクセストークンを記述
```

## デプロイ用のシェルスクリプトを作成

`.travis.yml`内の`deploy`の`script`ところで設定したデプロイ用のスクリプト`deploy.sh`の中身は以下です。

```shell
#!/usr/bin/env bash

set -e

if [[ "false" != "$TRAVIS_PULL_REQUEST" ]]; then
	echo "Not deploying pull requests."
	exit
fi

if [[ "master" != "$TRAVIS_BRANCH" ]]; then
	echo "Not on the 'master' branch."
	exit
fi

rm -rf .git
rm -r .gitignore

echo ".eslintrc
.travis.yml
README.md
bin
gulpfile.js
node_modules
package.json
package-lock.json
phpcs.ruleset.xml
src
tests
tmp
.vscode" > .gitignore

git init
git config user.name "githubのアカウント名"
git config user.email "githubのメールアドレス"
git add .
git commit -m "Update from travis $TRAVIS_COMMIT"
git push --force --quiet "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" master:release > /dev/null 2>&1
```

`githubのアカウント名`、`githubのメールアドレス`さえ変更してもらえれば使用できると思います。このスクリプトは、

- masterブランチへプッシュされた時
- プルリクエストでないこと

を条件に`release`ブランチへのプッシュを行います。5~13行目が上記の条件分岐の記述となります。

最終行の`/dev/null 2>&1`という記述があります。これは最後のコマンドの出力を`/dev/null`に捨てる（つまりTravis CIに出力させない）という記述です。これは何らかの理由でプッシュが失敗した際にアクセストークンがTravis CIのログに出力されてしまわないようにするための記述です。

これについては下記の記事がわかりやすかったので参考にしてください。

[いい加減覚えよう。command &gt; /dev/null 2&gt;&amp;1の意味 - Qiita](https://qiita.com/ritukiii/items/b3d91e97b71ecd41d4ea)

以上で設定は完了です。これで`master`ブランチにプッシュするとビルドされて`release`ブランチにプッシュまでの作業を自動化できるようになります。
