const todos = []

const render = () => {
  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="container">
      <h1 class="text-2xl font-bold mb-4">Todo App</h1>
      <input id="todoInput" class="input mb-2" type="text" placeholder="adicionar todo...">
      <button onclick="appLogic.addTodo()" class="button">Add</button>
      <ul class="mt-4">
        ${todos.map(todo => `<li>${todo} <button onclick="appLogic.removeTodo('${todo}')">x</button></li>`).join('')}
      </ul>
    </div>
  `
}

const addTodo = (todoText) => {
  if (todoText.trim() !== '') {
    todos.push(todoText);
    return true
  }
  return false
}

const removeTodo = (todo) => {
  const index = todos.indexOf(todo)
  if (index !== -1) {
    todos.splice(index, 1)
    return true
  }
  return false
}

render()

const appLogic = {
  addTodo: () => {
    const todoInput = document.getElementById('todoInput')
    const todoText = todoInput.value.trim()

    if (addTodo(todoText)) {
      todoInput.value = ''
      render()
    }
  },
  removeTodo: (todo) => {
    if (removeTodo(todo)) {
      render()
    }
  }
}
