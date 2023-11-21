const app = document.getElementById('app')

const todos = []

const render = () => {
  app.innerHTML = `
    <div class="mx-auto p-4 max-w-md">
      <h1 class="text-2xl font-bold mb-4">Lista To Do</h1>
      <input id="todoInput" class="w-full p-2 border rounded mb-2" type="text" placeholder="Adicionar todo...">
      <button onclick="addTodo()" class="bg-gray-700 text-white p-2 rounded">Add Todo</button>
      <ul class="mt-4">
        ${todos.map(todo => `<li>${todo}<button onclick="removeTodo('${todo}')">Remove</button></li>`).join('')}
      </ul>
    </div>
  `
}

const addTodo = () => {
  const todoInput = document.getElementById('todoInput')
  const todoText = todoInput.value.trim()

  if (todoText !== '') {
    todos.push(todoText)
    todoInput.value = ''
    render()
  }
}

const removeTodo = (todo) => {
  const index = todos.indexOf(todo)
  if (index !== -1) {
    todos.splice(index, 1)
    render()
  }
}

render()
