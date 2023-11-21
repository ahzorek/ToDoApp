function setupTrelleApp(container) {
  let appState = [
    { taskName: 'To Do', todos: [] },
    { taskName: 'In Progress', todos: [] },
    { taskName: 'Completed', todos: [] }
  ]

  const render = () => {
    container.innerHTML = `
        <div id="columns">
          ${appState.map((column, columnIndex) => `
            <div class="column" data-column-index="${columnIndex}">
              <h2>${column.taskName}</h2>
              <input type="text" placeholder="Add a new todo" id="todoInput-${columnIndex}">
              <button class="addTodo" data-column-index="${columnIndex}">Add Todo</button>
              <ul>
                ${column.todos.map((todo, todoIndex) => `
                  <li>${todo.text} <button class="removeTodo" data-column-index="${columnIndex}" data-todo-index="${todoIndex}">Remove</button></li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
    `

    document.querySelectorAll('.addTodo').forEach(btn => btn.addEventListener('click', addTodo))
    document.querySelectorAll('.removeTodo').forEach(btn => btn.addEventListener('click', removeTodo))
  }

  const addTodo = (event) => {
    const columnIndex = event.target.dataset.columnIndex
    const todoInput = document.getElementById(`todoInput-${columnIndex}`)
    const todoText = todoInput.value.trim()

    if (todoText !== '') {
      appState[columnIndex].todos.push({ text: todoText })
      render()
      todoInput.value = ''
    }
  }

  const removeTodo = (event) => {
    const columnIndex = event.target.dataset.columnIndex
    const todoIndex = event.target.dataset.todoIndex

    if (columnIndex !== undefined && todoIndex !== undefined) {
      appState[columnIndex].todos.splice(todoIndex, 1)
      render()
    }
  }

  render()
}

export default setupTrelleApp