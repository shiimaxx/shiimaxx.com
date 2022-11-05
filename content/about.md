# About

## 個人データ

- 氏名: 與島　孝忠 (よしま たかただ)
- ID: `shiimaxx`
- URL: https://shiimaxx.com


## 職務経歴

### 株式会社Topotal 2021/12〜

- 2021/12〜

### サイボウズ株式会社 2020/10〜2021/11

- 2020/10〜2021/11: 運用本部サービス運用部 クラウド基盤エンジニア（SRE）

### 株式会社ハートビーツ 2013/05〜2020/09

- 2013/05〜2015/05: 24/365のチームで監視業務を行う（研修期間含む）
- 2015/06〜2018/05: 顧客案件を担当するエンジニアリンググループに異動し、様々な顧客のシステム運用に関わる
- 2017/04〜2020/09: 技術開発室に異動（最初の1年は兼務）し、MSP事業を支えるソフトウェア開発を行う

#### 開発

- Datadog用監視ダッシュボードの開発
    - バックエンドAPI開発
        - Django
    - フロントエンド開発
        - React, TypeScript
    - インフラ
        - AWS（AWS Fargate）, Azure(Web App for Containers)のマルチクラウド構成
    - アーキテクチャ設計
    - 開発チームのリード
- 監視システムの運用・開発
    - 監視エージェント（happo-agent）とクローラーをGoで開発
        - 監視エージェント（happo-agent）
            - Nagiosとhappo-agentによるAmazon EC2 Auto Scalingの監視 https://heartbeats.jp/hbblog/2018/11/nagios-happo-agent-auto-scaling.html
                - https://github.com/heartbeatsjp/happo-agent/pull/37
            - 他にもPull Requestを多数
    - Nagios、Grafanaなどの設定ジェネレーターをPythonで開発
- カスタマーポータルの運用・開発
    - Djangoアプリケーション、GCP（GKE）で稼働
    - 最初のリリース後に開発に参加
- 社内外向けファイル共有サービスのリリース・運用・開発
    - Flaskアプリケーション、AWS（AWS Fargate）で稼働
    - 最初のリリースから開発に参加
    - TerraformによるAWSリソースの管理
    - GitLab CI/CDによるデプロイパイプラインの構築
- Azure Monitor用のチェックプラグイン・メトリックプラグイン azmonの開発
    - Azure Monitorのモニタリングプラグイン azmon を公開しました https://heartbeats.jp/hbblog/2019/04/azmon.html
    - https://github.com/heartbeatsjp/azmon
- Amazon EC2のバックアップツール go-create-imagebackupの開発
    - Amazon EC2のバックアップツール go-create-image-backupを公開しました https://heartbeats.jp/hbblog/2018/12/go-create-image-backup.html
    - https://github.com/heartbeatsjp/go-create-image-backup
- Mackerelチェックプラグイン check-smptの開発
    - Mackerelチェックプラグイン check-smtp を開発しました https://heartbeats.jp/hbblog/2018/08/go-check-plugins-check-smtp.html
    - https://github.com/mackerelio/go-check-plugins/pull/243

#### 運用

- 監視サーバ（Nagios）のリプレイス（オンプレミス→Azure）
- メトリックサーバ（Graphite）のリプレイス（オンプレミス→Azure）
    - happoメトリックサーバ Graphiteの移設 https://heartbeats.jp/hbblog/2019/12/migration-happo-metric-server.html
- GitHub Enterpriseの運用（AWS）
    - GitHub Enterpriseのアップグレード
- ソーシャルゲームサービスの運用（AWS）
    - Lambda, CloudWatch Event, Route53を利用した独自のAuto Scaling監視の仕組みを構築
- 不動産仲介業者向けシステムの運用（AWS）
    - AWSのコスト削減のためのシステムリソース調査と構成変更提案
    - E2EテストのプログラムをPython + Selemiumで開発
    - 時間指定でEC2インスタンスを開始・停止するためのツールをPythonで開発
    - S3オブジェクトを削除するツールをPythonで開発
- ECサイトのリプレイス（オンプレミス→さくらクラウド）
    - 設計、構築と切り替えを担当
    - Ansibleによるサーバ構築自動化
    - Pacemaker + DRBDによるクラスタ構築
    - XtraBackupによるバックアップとオブジェクトストレージへのアップロードを行うツールをPythonで開発
    - ディスクアーカイブを作成するツールをPythonで開発
- 画像変換サービスのリプレイス（オンプレミス→AWS）
    - 構築と負荷テストを担当
    - Ansibleによるサーバ構築自動化
    - Tsungによる負荷テストと負荷テスト報告書の作成
    - NAT Gatewayを切り替えるツールをPythonで開発
    - アラート対応簡略化のためのツールをPythonで開発
- 24時間365日の監視とアラート対応

#### その他

- テックリード（技術開発室 開発チーム）
    - 業務影響・効果を考慮した実現機能の選定と実装順決定
    - 開発サイクルの策定・改善
    - 開発スタイルの策定・改善
    - 実装の利用技術の選定
    - オンボーディングプランの作成と実施

- 社内におけるソフトウェアエンジニアリングの推進
    - 社内エンジニア向けのコードレビュー
        - コードレビューの実施
        - 依頼フローの策定
        - レビュアー向けドキュメント作成
        - よくあるレビュー指摘ポイントをまとめたドキュメントの作成
    - モブプログラミングの実施
    - 社内システムの開発タスクの実施をサポート
        - ひと通りの作業を作業実施者が主体的に進めていくのをサポート
        - 作業例
            - 要望を要件に落とし込み
            - コーディング、テスト、ドキュメンテーション
            - Pull Request作成

- 技術ブログ執筆
    - [happoメトリックサーバ Graphiteの移設](https://heartbeats.jp/hbblog/2019/12/migration-happo-metric-server.html)
    - [O'Reilly Velocity Conference 2019 San Jose参加レポート](https://heartbeats.jp/hbblog/2019/06/velocity2019sj.html)（共著）
    - [「入門Prometheus」を献本いただきました](https://heartbeats.jp/hbblog/2019/05/prometheus-up-and-running.html)
    - [Azure Monitorのモニタリングプラグイン azmon を公開しました](https://heartbeats.jp/hbblog/2019/04/azmon.html)
    - [Microsoft Kubernetes(AKS)/Azure DevOps ワークショップに参加してきました](https://heartbeats.jp/hbblog/2019/02/ms-aks-azure-devops-workshop.html)
    - [Amazon EC2のバックアップツール go-create-image-backupを公開しました](https://heartbeats.jp/hbblog/2018/12/go-create-image-backup.html)
    - [Nagiosとhappo-agentによるAmazon EC2 Auto Scalingの監視](https://heartbeats.jp/hbblog/2018/11/nagios-happo-agent-auto-scaling.html)
    - [Mackerelチェックプラグイン check-smtp を開発しました](https://heartbeats.jp/hbblog/2018/08/go-check-plugins-check-smtp.html)
    - [O'Reilly Velocity Conference 2018 San Jose参加レポート](https://heartbeats.jp/hbblog/2018/06/velocity2018sj.html)（共著）

### ウェブオフィス株式会社（現・TIS株式会社） 2010/04〜2013/04

- ITインストラクター
    - 基本情報技術者試験対策
    - Microsoft Office製品
- Eラーニングコンテンツ作成
    - 基本情報技術者試験過去問題


## 業務外活動

### オープンソース貢献

- https://github.com/xanzy/go-gitlab/pull/1113
- https://github.com/xanzy/go-gitlab/issues/1114
- Add test for if parse for user field is enable https://github.com/slack-go/slack/pull/512
- Add structs for dialog input validation error https://github.com/slack-go/slack/pull/453
- Do not use bundle name in "TOP n Slow Requests" https://github.com/matsuu/kataribe/pull/13

### 趣味プロダクト

- GitLabのMergeRequestからChangelogを生成するglchとGitLab Releaseを作成するglr https://shiimaxx.hatenablog.com/entry/glch-glr
- インタラクティブにテキスト処理を実行できるツールを作った - txtmanip https://shiimaxx.hatenablog.com/entry/txtmanip
- コマンドの終了ステータスを操作するツールを作った - altercode https://shiimaxx.hatenablog.com/entry/altercode

### 登壇

- golang.tokyo #20 https://golangtokyo.connpass.com/event/111077/
    - GoでDialogsを使ったSlack Appを作る https://go-talks.appspot.com/github.com/shiimaxx/present/go-slack-dialog/go-slack-dialog.slide#1
- Gopher道場#1 LT大会 https://mercari.connpass.com/event/88799/
    - contextによるキャンセル処理 / Go Context cancel https://speakerdeck.com/shiimaxx/go-context-cancel


## 執筆

- Software Design 2019年7月号 第1特集 “速い”Webアプリケーションの作り方［バックエンド編］ 第2章：勘に頼らず，測定によって確実に見極めよう https://gihyo.jp/magazine/SD/archive/2019/201907


## プログラミングスキル

- Go
    - 運用系ツール、内製監視システムの監視エージェント（happo-agent）とクローラーの開発に利用
    - メルペイ様主催の「#1 Gopher道場」に参加
        - https://mercari.connpass.com/event/83139/
- Python
    - 運用系ツールとWebアプリケーション（Django, Flask）の開発に利用
    - Python（Flask）がお題アプリケーションの社内ISUCONで優勝経験あり
        - https://heartbeats.jp/hbblog/2019/11/isucon---hisucon2019.html
- TypeScript
    - カスタマーポータルのフロントエンド開発に利用
    - 他の2つと比べて習熟度は低い
