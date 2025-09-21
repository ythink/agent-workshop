import { describe, it, expect, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import { todoStore } from '../models/todoStore.js';
import todosRouter from '../routes/todos.js';

describe('Todos API', () => {
  let app;

  beforeEach(() => {
    // テスト用のExpress appを作成
    app = express();
    app.use(express.json());
    app.use('/todos', todosRouter);

    // ストアをリセット
    todoStore.todos.clear();
    todoStore.lastId = 0;
  });

  describe('GET /todos', () => {
    beforeEach(() => {
      // テストデータをセットアップ
      const todo1 = todoStore.create({ title: 'Todo 1' });
      const todo2 = todoStore.create({ title: 'Todo 2' });
      todoStore.update(todo2.id, { status: 'Doing' });
      const todo3 = todoStore.create({ title: 'Todo 3' });
      todoStore.update(todo3.id, { status: 'Completed' });
    });

    it('should return todos grouped by status', async () => {
      const response = await request(app)
        .get('/todos')
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todos');
      expect(response.body.todos).toHaveProperty('Todo');
      expect(response.body.todos).toHaveProperty('Doing');
      expect(response.body.todos).toHaveProperty('Completed');

      expect(response.body.todos.Todo).toHaveLength(1);
      expect(response.body.todos.Doing).toHaveLength(1);
      expect(response.body.todos.Completed).toHaveLength(1);
    });
  });

  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const response = await request(app)
        .post('/todos')
        .send({ title: 'New Todo' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(String),
        title: 'New Todo',
        status: 'Todo',
        createdAt: expect.any(String)
      });
    });

    it('should return 400 when title is missing', async () => {
      const response = await request(app)
        .post('/todos')
        .send({})
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /todos/:id', () => {
    let todoId;

    beforeEach(() => {
      const todo = todoStore.create({ title: 'Test Todo' });
      todoId = todo.id;
    });

    it('should update a todo', async () => {
      const response = await request(app)
        .put(`/todos/${todoId}`)
        .send({ status: 'Doing' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: todoId,
        title: 'Test Todo',
        status: 'Doing',
        createdAt: expect.any(String)
      });
    });

    it('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .put('/todos/999')
        .send({ status: 'Doing' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /todos/:id', () => {
    let todoId;

    beforeEach(() => {
      const todo = todoStore.create({ title: 'Test Todo' });
      todoId = todo.id;
    });

    it('should delete a todo', async () => {
      const response = await request(app)
        .delete(`/todos/${todoId}`);

      expect(response.status).toBe(204);
      expect(todoStore.getById(todoId)).toBeUndefined();
    });

    it('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .delete('/todos/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});