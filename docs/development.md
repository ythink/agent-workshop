# Dev Container 設定ガイド

このプロジェクトでは、VS Code Dev Container を利用して一貫した Node.js 開発環境を提供しています。

## 1. 構成ファイル一覧

- `.devcontainer/devcontainer.json` : Dev Container の主要設定ファイル
- `.devcontainer/Dockerfile` : カスタム開発環境の Docker イメージ定義
- `.devcontainer/docker-compose.yml` : サービス連携用（MongoDB 拡張用）

## 2. 主な設定内容

### devcontainer.json

- Node.js v20 ベースの公式イメージを利用
- Git, GitHub CLI の開発ツールを追加
- VS Code 拡張機能（ESLint, Prettier, Copilot, Docker 等）を自動インストール
- ポート 3000 を自動でフォワード
- その他のポートの自動フォワーディングは無効化（セキュリティ対策）
- コンテナ作成時に `npm install` を自動実行

### Dockerfile

- Node.js 公式イメージをベースに追加ツール（git, curl 等）をインストール
- npm, nodemon, eslint, prettier をグローバルインストール
- 作業ディレクトリを `/workspaces/agent-workshop` に設定

### docker-compose.yml

- アプリケーションサービス（app）と MongoDB サービス（db）を定義
- MongoDB は将来の拡張用（現状は未使用）
- ボリュームマウントでソースコードを永続化

## 3. 利用方法

1. VS Code でプロジェクトを開く
2. コマンドパレットから「Reopen in Container」を選択
3. Dev Container 内で開発・テスト・実行が可能

## 4. 開発環境の特徴

- Node.js 20.x 環境での一貫した開発
- 必要なツール・拡張機能が自動セットアップ
- ホットリロードや Lint/Format の自動化
- セキュアなポートフォワーディング（アプリケーションポートのみ開放）
- 将来の DB 拡張にも対応可能

## 5. カスタマイズ例

- VS Code 拡張機能や設定は `devcontainer.json` の `customizations.vscode.extensions` で追加可能
- Dockerfile で追加パッケージをインストール可能
- docker-compose.yml で他サービス連携も容易

---

Dev Container を利用することで、環境差異によるトラブルを防ぎ、快適な開発体験を実現できます。
