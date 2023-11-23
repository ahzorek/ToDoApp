const todoList = document.getElementById('todoList')

const todos = []

const render = () => {
  todoList.innerHTML = `
   ${todos.map(todo => `<li class="flex justify-between">${todo}<button onclick="removeTodo('${todo}')">Delete</button></li>`).join('')}
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
