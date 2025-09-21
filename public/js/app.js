// 新規ToDoの作成
async function createTodo() {
  const input = document.getElementById('newTodoInput');
  const title = input.value.trim();

  if (!title) {
    alert('タイトルを入力してください');
    return;
  }

  try {
    const response = await fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });

    if (!response.ok) {
      throw new Error('ToDo の作成に失敗しました');
    }

    // 画面を更新
    window.location.reload();
  } catch (error) {
    alert(error.message);
  }

  input.value = '';
}

// ToDoのステータス更新
async function updateTodoStatus(id, newStatus) {
  try {
    const response = await fetch(`/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (!response.ok) {
      throw new Error('ToDo の更新に失敗しました');
    }

    // 画面を更新
    window.location.reload();
  } catch (error) {
    alert(error.message);
  }
}

// ToDoの削除
async function deleteTodo(id) {
  if (!confirm('このToDoを削除してもよろしいですか？')) {
    return;
  }

  try {
    const response = await fetch(`/todos/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('ToDo の削除に失敗しました');
    }

    // 画面を更新
    window.location.reload();
  } catch (error) {
    alert(error.message);
  }
}

// Enter キーでの ToDo 作成
document.getElementById('newTodoInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    createTodo();
  }
});