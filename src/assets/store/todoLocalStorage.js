export const todoLocalStorage = {
  get: (key) => {
    let todos = JSON.parse(localStorage.getItem(key) || '[]');
    let idForTodo = 0;

    todos.forEach((todo, index) => {
      todo.id = index
      idForTodo = index + 1
    });

    return {todos, idForTodo};
  },
  set: (key, todos) => {
    localStorage.setItem(key, JSON.stringify(todos));
  }
}
