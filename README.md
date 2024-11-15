# rss-portal

Para7 の普段見ている技術ブログをまとめたRSS リーダーです。

<https://para7.github.io/tech-rss-portal/>

## 特徴

- SSG (JAM Stack) 構成
- JS すら不使用のため、ページが超軽量 (50KBぐらい)

## 対象サイトについて

src/lib/feedTargets.ts にフィード URL 一覧があります。

このプロジェクトは個人的なウォッチが中心ですので、対象サイト追加のプルリクエストについては受け付けない可能性が高いです。

このプロジェクトをフォークして対象 URL を変更し、デプロイすればお好きなサイトの収集用として使えます。

## github actions の利用について

2024年現在の規約では、負荷の少ないアクションであれば個人的用途に使っても問題ないと記載されています。

このプロジェクトのビルドは1日に1回、40秒程度とかなり軽量です。

https://docs.github.com/ja/site-policy/github-terms/github-terms-for-additional-products-and-features#actions

> 当社のサーバーに負担をかけるアクティビティで、その負担がユーザーに提供される利益に見合わない場合 (たとえば、Actions をコンテンツ配信ネットワークまたはサーバーレス アプリケーションの一部として使用しないでください。ただし、利益の小さい Action でも負荷が小さければ問題ありません)、
