export const setupTodoApp = (container) => {
  const todos = []

  const render = () => {
    container.innerHTML = `
      <div>
        <h1>Coisas To Do</h1>
        <div class="addTodoWrapper">
          <input id="todoInput" type="text" placeholder="Adicionar todo...">
          <button id="addTodo">+</button>
        </div>
        <ul class="todoList">
          ${todos.map((todo, index) => `
            <li class="todos">
              <input type="checkbox" id="checkbox-${index}" ${todo.completed ? 'checked' : ''}>
              <label for="checkbox-${index}" class="todo ${todo.completed ? 'completed' : ''}">${todo.text}</label>
              <button class="removeTodo" data-index="${index}">❌</button>
            </li>`).join('')}
        </ul>
      </div>
    `

    document.getElementById('addTodo').addEventListener('click', addTodo)
    container.querySelectorAll('.removeTodo').forEach(btn => btn.addEventListener('dblclick', removeTodo))
    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.addEventListener('change', toggleCompleted))
  }

  const addTodo = () => {
    const todoInput = document.getElementById('todoInput')
    const todoText = todoInput.value.trim()

    if (todoText !== '') {
      todos.push({ text: todoText, completed: false })
      render()
      todoInput.value = ''
    }
  }

  const removeTodo = (event) => {
    const index = event.target.dataset.index
    if (index !== undefined) {
      todos.splice(index, 1)
      render()
    }
  }

  const toggleCompleted = (event) => {
    const index = parseInt(event.target.id.split('-')[1], 10)
    if (index !== undefined) {
      todos[index].completed = !todos[index].completed
      render()
    }
  }

  render()
}
