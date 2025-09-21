# アプリケーション設計ドキュメント

## 1. アプリケーション概要

このアプリケーションはNode.jsとExpressを使用したシンプルなWebアプリケーションです。データはメモリ上に保存され、アプリケーションの再起動時にリセットされます。

## 2. 技術スタック

- **サーバーサイド**: Node.js (v20+)
- **フレームワーク**: Express.js v5.1.0
- **テンプレートエンジン**: EJS v3.1.10
- **データストレージ**: インメモリ（JavaScript配列/オブジェクト）
- **開発言語**: JavaScript (ES2022)
- **モジュール形式**: ES Modules

## 3. プロジェクト構造

```
agent-workshop/
├── app.js              # アプリケーションのエントリーポイント
├── routes/             # ルーティング関連ファイル
│   ├── index.js       # メインルーティング
│   └── api.js         # APIルーティング
├── models/            # データモデル定義
│   └── store.js      # インメモリストアの実装
├── views/             # EJSテンプレート
│   ├── index.ejs     # メインページ
│   └── error.ejs     # エラーページ
├── public/            # 静的ファイル
│   └── css/          # スタイルシート
│       └── style.css
└── test/             # テストファイル
    └── app.test.js
```

## 4. データモデル

### インメモリストア設計

```javascript
// models/store.js
class Store {
  constructor() {
    this.items = new Map();
    this.lastId = 0;
  }

  // アイテムの追加
  create(item) {
    const id = ++this.lastId;
    const newItem = { id, ...item, createdAt: new Date() };
    this.items.set(id, newItem);
    return newItem;
  }

  // アイテムの取得
  get(id) {
    return this.items.get(id);
  }

  // 全アイテムの取得
  getAll() {
    return Array.from(this.items.values());
  }

  // アイテムの更新
  update(id, item) {
    if (!this.items.has(id)) return null;
    const updatedItem = { ...this.items.get(id), ...item, updatedAt: new Date() };
    this.items.set(id, updatedItem);
    return updatedItem;
  }

  // アイテムの削除
  delete(id) {
    return this.items.delete(id);
  }
}
```

## 5. API仕様

### エンドポイント

#### アイテム管理 API

- **GET /api/items**
  - 全アイテムの取得
  - レスポンス: アイテムの配列

- **GET /api/items/:id**
  - 特定のアイテムの取得
  - パラメータ: id
  - レスポンス: 単一のアイテム

- **POST /api/items**
  - 新規アイテムの作成
  - ボディ: アイテムデータ
  - レスポンス: 作成されたアイテム

- **PUT /api/items/:id**
  - アイテムの更新
  - パラメータ: id
  - ボディ: 更新データ
  - レスポンス: 更新されたアイテム

- **DELETE /api/items/:id**
  - アイテムの削除
  - パラメータ: id
  - レスポンス: 成功時204

### レスポンス形式

```javascript
// 成功レスポンス
{
  "success": true,
  "data": {
    // レスポンスデータ
  }
}

// エラーレスポンス
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ"
  }
}
```

## 6. エラーハンドリング

アプリケーションは以下のエラーケースを処理します：

- 404 Not Found: リソースが見つからない場合
- 400 Bad Request: リクエストの形式が不正な場合
- 500 Internal Server Error: サーバー内部エラーの場合

エラーは一貫した形式で返され、ログに記録されます。

## 7. セキュリティ考慮事項

1. **入力バリデーション**
   - すべてのユーザー入力は適切にバリデーションされます
   - XSS対策としてEJSのエスケープ機能を使用

2. **エラー処理**
   - 詳細なエラー情報は本番環境では非表示
   - エラースタックトレースは開発環境でのみ表示

## 8. パフォーマンス考慮事項

1. **メモリ管理**
   - ストアのサイズ制限の実装
   - 定期的なクリーンアップ処理

2. **レスポンスタイム**
   - 適切なインデックス構造の使用
   - 効率的なデータ検索アルゴリズムの実装

## 9. テスト戦略

1. **ユニットテスト**
   - ストアの各メソッドのテスト
   - ルーティングのテスト

2. **統合テスト**
   - APIエンドポイントのテスト
   - エラーハンドリングのテスト

## 10. 今後の拡張性

1. **永続化層の追加**
   - データベース統合の容易な実装
   - インメモリストアをラップする抽象レイヤーの提供

2. **機能拡張**
   - ユーザー認証の追加
   - キャッシュレイヤーの実装
   - WebSocket対応