慣れる？JS 素早く究明！デバッグ入門
===================================

素早く原因究明をするための多段式エラープルーフの実例です。



多段式エラープルーフとは？
--------------------------

デバッグの時間を短くするために、複数のレイヤーのエラープルーフを併用する開発スタイルです。
詳しくはスライドをご覧ください:

- https://speakerdeck.com/orgachem/guan-reru-js-su-zao-kujiu-ming-debatuguru-men



多段式エラープルーフの体験方法
------------------------------

### インストール

このプロジェクトを動かすには、Node.js v4 以上が必要です。
[ndenv](https://github.com/riywo/ndenv)などを使って、Node.js v4 以上のバージョンをインストールしてください。

Node.js が準備できたら、以下のコマンドを実行してください:

```console
$ git clone https://github.com/Kuniwak/how-to-debug-js
$ cd how-to-debug-js
$ npm install
```



### 構文ハイライト

お好きなエディタで、TypeScript にきちんと色がつく構文ハイライトを使ってください。
宗教戦争を避けるために、ここでは具体的なエディタやIDEへの言及は控えます。


### リント

リントとは、変数名のタイポや、落とし穴のある書き方を調べるツールです。

例えば、以下のように `var` を使ったコードがあったら、「`const` を使うといいよ！」と教えてくれたりします。

```typescript
var hoge = new Hoge();
```

このリントは、以下のコマンドで実行できます:

```console
$ npm run lint
``` 



### 静的型検査

静的型検査とは、変数やプロパティに、どのようなオブジェクトや値が入っているのかを追跡して、不整合が起きていないかどうかをチェックする仕組みです。
例えば、存在しないメソッドや、間違った引数などを発見することができます。

例えば、以下のコードには不整合があります:

```javascript
const numberA = 10;
const numberB = document.getElementById('input').textContent;

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(numberA, numberB));
```

これを TypeScript コンパイラにかけてみると次のように指摘されます:

```typescript
const numberA = 10;
const numberB = document.getElementById('input').textContent;

function add(a: number, b: number): number {
  return a + b;
}

// 実は numberB には文字列が格納されているので、
// 足し算すると文字列の結合になってしまう！
//
// TypeScript はこの関数呼び出しがおかしいことを指摘してくれる。
console.log(add(numberA, numberB));
```

実際に、TypeScript の[オンラインデモ](http://www.typescriptlang.org/play/#src=const%20numberA%20%3D%2010%3B%0Aconst%20numberB%20%3D%20document.getElementById%28%27input%27%29.textContent%3B%0A%0Afunction%20add%28a%3A%20number%2C%20b%3A%20number%29%3A%20number%20{%0A%20%20return%20a%20%2B%20b%3B%0A}%0A%0Aconsole.log%28add%28numberA%2C%20numberB%29%29%3B)で手軽に試すことができます。

このプロジェクトにおける TypeScript コンパイラは次のコマンドで実行できます:

```console
$ npm run build
```


### 単体・結合テスト

単体テストは、関数やクラスをいくつかの入力で試しに実行してみて、期待する振る舞いをするかどうかを、プログラムで検証する手法です。
品質をガッツリ保証するというよりかは、開発者がコードの正しさを確信するために書きます。

結合テストは、関数やクラスの組み合わせに着目して検証する手法です。
単体テストとの違いは、何をテストするかです:

- 単体テスト: 個別の関数やクラスを検証する
- 結合テスト: 関数やクラスの組み合わせを検証する

このプロジェクトにおける単体テストは、次のコマンドで実行できます:

```console
$ npm test
```


### E2Eテスト

E2Eテストは、Webブラウザーを使った最上位の結合テストです。
E2Eテストでは、ブラウザーをプログラムから操作して、あたかもユーザーがブラウザーを操作しているかのようにシミュレーションします。

このプロジェクトにおけるE2Eテストは、次のコマンドで実行できます:

```console
$ npm run e2e
```


### 手動動作確認

次のコマンドを実行し、表示された URL へ Web ブラウザからアクセスすると動作確認できます。

```console
$ npm start

> inurement-js-debug@0.0.0 start path/to/how-to-debug-js
> node bin/start-server

http://localhost:8080/public にブラウザでアクセスしてください
```


このプロジェクトで使っている多段式エラープルーフ
------------------------------------------------

| エラープルーフのレイヤー | 使っているツール                                                                                                                                |
|:-------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| 構文ハイライト           | お好きなものをお使いください                                                                                                                    |
| リント                   | [TSLint](https://palantir.github.io/tslint/)                                                                                                    |
| 静的型検査               | [TypeScript](https://www.typescriptlang.org/)                                                                                                   |
| 単体・結合テスト         | [Mocha](https://mochajs.org/) + [chai](https://www.npmjs.com/package/chai)                                                                      |
| E2Eテスト                | Mocha + chai + [selenium-webdriver](https://github.com/SeleniumHQ/selenium/tree/master/javascript/node/selenium-webdriver#selenium-webdriver)   |
| 手動動作確認             |                                                          |


ライセンス
----------

The MIT License (MIT)

Copyright (c) 2014 Kuniwak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
