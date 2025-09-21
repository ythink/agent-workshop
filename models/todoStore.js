export class TodoStore {
  constructor() {
    this.todos = new Map();
    this.lastId = 0;
  }

  /**
   * 新しいToDoアイテムを作成
   * @param {Object} todo - ToDoアイテムのデータ
   * @param {string} todo.title - ToDoのタイトル
   * @returns {Object} 作成されたToDoアイテム
   */
  create(todo) {
    const id = String(++this.lastId);
    const newTodo = {
      id,
      title: todo.title,
      status: 'Todo',
      createdAt: new Date().toISOString()
    };
    this.todos.set(id, newTodo);
    return newTodo;
  }

  /**
   * 全てのToDoアイテムを取得
   * @returns {Object[]} ToDoアイテムの配列
   */
  getAll() {
    return Array.from(this.todos.values());
  }

  /**
   * 特定のToDoアイテムを取得
   * @param {string} id - ToDoアイテムのID
   * @returns {Object|undefined} ToDoアイテム
   */
  getById(id) {
    return this.todos.get(id);
  }

  /**
   * ToDoアイテムを更新
   * @param {string} id - 更新するToDoアイテムのID
   * @param {Object} updates - 更新するプロパティ
   * @returns {Object|null} 更新されたToDoアイテム、存在しない場合はnull
   */
  update(id, updates) {
    const todo = this.todos.get(id);
    if (!todo) return null;

    const updatedTodo = {
      ...todo,
      ...updates,
      id // IDは上書きされないようにする
    };

    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  /**
   * ToDoアイテムを削除
   * @param {string} id - 削除するToDoアイテムのID
   * @returns {boolean} 削除が成功したかどうか
   */
  delete(id) {
    return this.todos.delete(id);
  }

  /**
   * ステータスでToDoアイテムをフィルタリング
   * @param {string} status - フィルタリングするステータス
   * @returns {Object[]} フィルタリングされたToDoアイテムの配列
   */
  getByStatus(status) {
    return this.getAll().filter(todo => todo.status === status);
  }
}

// シングルトンインスタンスをエクスポート
export const todoStore = new TodoStore();