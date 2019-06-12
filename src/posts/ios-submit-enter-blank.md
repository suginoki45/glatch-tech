---
path: "/ios-submit-enter-blank"
tags: ["iOS"]
date: 2018-08-09
modified: 2019-06-12
title: iOS Safariでform要素にtarget="_blank”を指定しているとEnterキーによるsubmitが効かない
description: iOS Safariでform要素にtarget="_blank”を指定しているとEnterキーによるsubmitが効かない事象が発生しました。当記事では当該事象の対応方法を紹介しています。
---

iOSのSafariでtarget="_blank"を指定にしているとinputを入力しEnterキーによる送信を実行しても効かない現象に遭遇しました。

JavaScriptでEnterキーをタップされたらsubmitを実行する処理を書いてあげることで期待通りの動作を実現できました。

```javascript
$('input[name="hoge"]').on('keyup', (e) => {
    if(e.which === 13) {
        $('form').submit();
        e.preventDefault();
    }
});
```