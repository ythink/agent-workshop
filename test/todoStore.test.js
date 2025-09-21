import { describe, it, expect, beforeEach } from 'vitest';
import { TodoStore } from '../models/todoStore.js';

describe('TodoStore', () => {
  let store;

  beforeEach(() => {
    store = new TodoStore();
  });

  describe('create', () => {
    it('should create a new todo item', () => {
      const todo = store.create({ title: 'Test Todo' });

      expect(todo).toEqual({
        id: expect.any(String),
        title: 'Test Todo',
        status: 'Todo',
        createdAt: expect.any(String)
      });
    });

    it('should generate unique IDs', () => {
      const todo1 = store.create({ title: 'Todo 1' });
      const todo2 = store.create({ title: 'Todo 2' });

      expect(todo1.id).not.toBe(todo2.id);
    });
  });

  describe('getAll', () => {
    it('should return an empty array when no todos exist', () => {
      const todos = store.getAll();
      expect(todos).toEqual([]);
    });

    it('should return all created todos', () => {
      const todo1 = store.create({ title: 'Todo 1' });
      const todo2 = store.create({ title: 'Todo 2' });

      const todos = store.getAll();
      expect(todos).toHaveLength(2);
      expect(todos).toEqual(expect.arrayContaining([todo1, todo2]));
    });
  });

  describe('getById', () => {
    it('should return undefined for non-existent todo', () => {
      const todo = store.getById('999');
      expect(todo).toBeUndefined();
    });

    it('should return the correct todo by ID', () => {
      const created = store.create({ title: 'Test Todo' });
      const found = store.getById(created.id);
      expect(found).toEqual(created);
    });
  });

  describe('update', () => {
    it('should update todo properties', () => {
      const todo = store.create({ title: 'Original Title' });
      const updated = store.update(todo.id, {
        title: 'Updated Title',
        status: 'Doing'
      });

      expect(updated).toEqual({
        ...todo,
        title: 'Updated Title',
        status: 'Doing'
      });
    });

    it('should preserve unmodified properties', () => {
      const todo = store.create({ title: 'Test Todo' });
      const updated = store.update(todo.id, { status: 'Doing' });

      expect(updated.title).toBe(todo.title);
      expect(updated.createdAt).toBe(todo.createdAt);
    });

    it('should return null for non-existent todo', () => {
      const result = store.update('999', { title: 'Updated' });
      expect(result).toBeNull();
    });

    it('should not allow ID modification', () => {
      const todo = store.create({ title: 'Test Todo' });
      const updated = store.update(todo.id, { id: '999' });

      expect(updated.id).toBe(todo.id);
    });
  });

  describe('delete', () => {
    it('should delete existing todo', () => {
      const todo = store.create({ title: 'Test Todo' });
      const result = store.delete(todo.id);

      expect(result).toBe(true);
      expect(store.getById(todo.id)).toBeUndefined();
    });

    it('should return false for non-existent todo', () => {
      const result = store.delete('999');
      expect(result).toBe(false);
    });
  });

  describe('getByStatus', () => {
    beforeEach(() => {
      store.create({ title: 'Todo 1' }); // Status: Todo
      const todo2 = store.create({ title: 'Todo 2' });
      store.update(todo2.id, { status: 'Doing' });
      const todo3 = store.create({ title: 'Todo 3' });
      store.update(todo3.id, { status: 'Completed' });
    });

    it('should return todos with specified status', () => {
      const todoItems = store.getByStatus('Todo');
      const doingItems = store.getByStatus('Doing');
      const completedItems = store.getByStatus('Completed');

      expect(todoItems).toHaveLength(1);
      expect(doingItems).toHaveLength(1);
      expect(completedItems).toHaveLength(1);

      expect(todoItems[0].status).toBe('Todo');
      expect(doingItems[0].status).toBe('Doing');
      expect(completedItems[0].status).toBe('Completed');
    });

    it('should return empty array for non-existent status', () => {
      const items = store.getByStatus('Invalid');
      expect(items).toEqual([]);
    });
  });
});