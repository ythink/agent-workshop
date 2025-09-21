import express from 'express';
import { todoStore } from '../models/todoStore.js';

const router = express.Router();

// ToDoアイテムの一覧を取得
router.get('/', (req, res) => {
  const todos = todoStore.getAll();
  const grouped = {
    Todo: todoStore.getByStatus('Todo'),
    Doing: todoStore.getByStatus('Doing'),
    Completed: todoStore.getByStatus('Completed')
  };
  
  if (req.headers.accept?.includes('application/json')) {
    res.json({ todos: grouped });
  } else {
    res.render('index', { todos: grouped });
  }
});

// 新しいToDoアイテムを作成
router.post('/', express.json(), (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({
      error: 'Title is required'
    });
  }

  const todo = todoStore.create({ title });
  res.status(201).json(todo);
});

// ToDoアイテムを更新
router.put('/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedTodo = todoStore.update(id, updates);
  if (!updatedTodo) {
    return res.status(404).json({
      error: 'Todo not found'
    });
  }

  res.json(updatedTodo);
});

// ToDoアイテムを削除
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const success = todoStore.delete(id);

  if (!success) {
    return res.status(404).json({
      error: 'Todo not found'
    });
  }

  res.status(204).end();
});

export default router;