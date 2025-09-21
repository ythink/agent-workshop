import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import todosRouter from './routes/todos.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// テンプレートエンジンの設定
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// 静的ファイルの提供
app.use(express.static(join(__dirname, 'public')));

// ルーティング
app.use('/todos', todosRouter);
app.get('/', (req, res) => {
  res.redirect('/todos');
});

// エラーハンドリング
app.use((req, res, next) => {
  res.status(404).render('error', {
    error: { message: 'ページが見つかりません' }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    error: { message: '内部サーバーエラーが発生しました' }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});