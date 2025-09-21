/docs/requirements.md と /docs/application.md に従ってテストコードを実装お願いします。
テストケースの一覧を /docs/test-cases.md にまとめてください。

実装時の注意点：
1. テストフレームワークにはVitestを使用します。
2. カバレッジレポートのプロバイダーには'v8'を使用してください。
3. APIエンドポイントのテストにはsupertestを使用します。

必要なパッケージ：
```bash
npm install -D vitest supertest
```

フォルダ構成：
```
test/
  ├── todoStore.test.js  # TodoStoreの単体テスト
  └── todos.test.js      # APIエンドポイントの統合テスト

vitest.config.js         # Vitestの設定ファイル
docs/
  └── test-cases.md      # テストケース一覧
```

テスト実行コマンド：
```bash
# すべてのテストを実行
npm test

# 監視モードでテストを実行（開発時）
npm test -- --watch

# カバレッジレポートを生成
npm test -- --coverage
```