import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // グローバルな設定
    globals: true,
    environment: 'node',
    
    // テストファイルのパターン
    include: ['test/**/*.test.js'],
    
    // カバレッジの設定
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['models/**/*.js', 'routes/**/*.js'],
    },
    
    // テストのタイムアウト設定
    testTimeout: 10000,
    
    // 並列実行の設定
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    }
  }
});