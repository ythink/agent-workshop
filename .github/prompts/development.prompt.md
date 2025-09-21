/docs/requirements.md と　/docs/application.md に従ってアプリケーションを作成お願いします。

package.json には以下を含めてください。

1.プロジェクト情報
名前: agent-workshop
バージョン: 1.0.0
タイプ: module（ES Modulesを使用）

2.スクリプト
npm start: アプリケーションを起動
npm run dev: 開発モードで起動（nodemonを使用）
npm test: テストを実行（vitestを使用）

3. 依存関係
- 本番環境
express: Webアプリケーションフレームワーク
ejs: テンプレートエンジン
body-parser: リクエストボディのパース

開発環境
nodemon: 開発時のホットリロード
vitest: テストフレームワーク

