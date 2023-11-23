export default function TrelloLikeApp(container) {
  let appState = [
    {
      "taskName": "Ideação e Planejamento 🚀",
      "todos": [
        { "text": "Desenvolver landing pages", "completed": false },
        { "text": "Conduzir pesquisa de mercado", "completed": false },
        { "text": "Definir metas e objetivos", "completed": false }
      ]
    },
    {
      "taskName": "Design e Prototipagem 🎨",
      "todos": [
        { "text": "Criar design das landing pages", "completed": false },
        { "text": "Obter feedback de design", "completed": false },
        { "text": "Refinar protótipos", "completed": false }
      ]
    },
    {
      "taskName": "Implementação 🚧",
      "todos": [
        { "text": "Codificar as landing pages", "completed": false },
        { "text": "Realizar testes de funcionalidade", "completed": false },
        { "text": "Integrar conteúdo e recursos", "completed": false }
      ]
    },
    {
      "taskName": "Testes e Ajustes 🧪",
      "todos": [
        { "text": "Conduzir testes de usabilidade", "completed": false },
        { "text": "Corrigir bugs identificados", "completed": false },
        { "text": "Otimizar desempenho", "completed": false }
      ]
    },
    {
      "taskName": "Lançamento e Avaliação 🚀",
      "todos": [
        { "text": "Publicar as landing pages", "completed": false },
        { "text": "Avaliar o desempenho inicial", "completed": false },
        { "text": "Coletar feedback dos usuários", "completed": false }
      ]
    }
  ]

  const render = () => {
    container.innerHTML = `
      <div id="columns">
        ${appState.map((column, columnIndex) => `
          <div class="column" data-column-index="${columnIndex}">
          <div class="column-header-actions">
            <h2 title="Clique duplo para renomear" data-column-index="${columnIndex}" class="taskTitleName">${column.taskName}</h2>
              ${columnIndex !== 0 ? `
                <button class="removeTask" data-column-index="${columnIndex}">🗑</button>
              ` : ''}
            </div>
            <span class="inputTodo">
              <input type="text" placeholder="Adicionar novo item" id="todoInput-${columnIndex}">
              <button class="addTodo" data-column-index="${columnIndex}">➕</button>
            </span>
            <ul>
              ${column.todos.map((todo, todoIndex) => `
                <li class="${todo.completed ? 'completed' : ''}" data-todo-index="${todoIndex}">
                  <input type="checkbox" class="toggleTodo" data-column-index="${columnIndex}" data-todo-index="${todoIndex}" ${todo.completed ? 'checked' : ''}>
                  <span class="editable" contenteditable="false">${todo.text}</span>
                  <div class="buttons">
                    <button class="removeTodo" data-column-index="${columnIndex}" data-todo-index="${todoIndex}">❌</button>
                    ${columnIndex < appState.length - 1 ? `
                      <button class="moveTodo" data-column-index="${columnIndex}" data-todo-index="${todoIndex}">⏩</button>
                    ` : ''}
                  </div>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
          <div class="column empty" data-column-index="${appState.length}">
            <div class="column-header-actions">
              <button class="addTask" data-column-index="${appState.length}">Nova coluna +</button>
            </div>
          </div>
      </div>
    `

    document.querySelectorAll('.addTodo').forEach(btn => btn.addEventListener('click', addTodo))
    document.querySelectorAll('.removeTodo').forEach(btn => btn.addEventListener('click', removeTodo))
    document.querySelectorAll('.toggleTodo').forEach(checkbox => checkbox.addEventListener('change', toggleTodo))
    document.querySelectorAll('.editable').forEach(span => {
      span.addEventListener('dblclick', function () {
        const columnIndex = this.closest('.column').dataset.columnIndex
        const todoIndex = this.closest('li').dataset.todoIndex
        enableEditMode(columnIndex, todoIndex)
      })
    })
    document.querySelectorAll('.editable').forEach(span => span.addEventListener('blur', saveTodo))
    document.querySelectorAll('.moveTodo').forEach(btn => btn.addEventListener('click', moveTodo))
    document.querySelectorAll('.addTask').forEach(btn => btn.addEventListener('click', addTask))
    document.querySelectorAll('.removeTask').forEach(btn => btn.addEventListener('click', removeTask))
    document.querySelectorAll('.taskTitleName').forEach(task => task.addEventListener('dblclick', (e) => {
      const columnIndex = e.target.dataset.columnIndex
      renameTask(columnIndex)
    }))

    console.log(appState)
  }


  const addTodo = (event) => {
    const columnIndex = event.target.dataset.columnIndex;
    const todoInput = document.getElementById(`todoInput-${columnIndex}`)
    const todoText = todoInput.value.trim()

    if (todoText !== '') {
      appState[columnIndex].todos.push({ text: todoText, completed: false })
      render();
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

  const toggleTodo = (event) => {
    const columnIndex = event.target.dataset.columnIndex
    const todoIndex = event.target.dataset.todoIndex

    if (columnIndex !== undefined && todoIndex !== undefined && appState[columnIndex].todos[todoIndex]) {
      appState[columnIndex].todos[todoIndex].completed = event.target.checked
      render()
    }
  }

  const enableEditMode = (columnIndex, todoIndex) => {
    const span = document.querySelector(`[data-column-index="${columnIndex}"] [data-todo-index="${todoIndex}"] .editable`)
    span.contentEditable = true;
    span.focus()
  }

  const saveTodo = (event) => {
    const columnIndex = event.target.closest('.column').dataset.columnIndex
    const todoIndex = event.target.closest('li').dataset.todoIndex

    if (columnIndex !== undefined && todoIndex !== undefined) {
      appState[columnIndex].todos[todoIndex].text = event.target.innerText.trim()
      event.target.contentEditable = false
      render()
    }
  }

  const moveTodo = (event) => {
    const columnIndex = event.target.dataset.columnIndex
    const todoIndex = event.target.dataset.todoIndex

    console.log(columnIndex, todoIndex)

    const todoToMove = appState[columnIndex].todos.splice(todoIndex, 1)[0]
    const nextColumnIndex = parseInt(columnIndex) + 1

    if (appState[nextColumnIndex]) {
      appState[nextColumnIndex].todos.push(todoToMove)
      render()
    }
  }

  const removeTask = (event) => {
    const columnIndex = event.target.dataset.columnIndex;
    const todos = appState[columnIndex].todos;

    if (todos.length === 0 || confirm("A coluna não está vazia. Tem certeza que deseja removê-la?")) {
      appState.splice(columnIndex, 1);
      render()
    }
  }


  const renameTask = (columnIndex) => {
    const newTaskName = prompt('Nome:', appState[columnIndex].taskName)
    if (newTaskName !== null) {
      appState[columnIndex].taskName = newTaskName
    }
    render()
  }

  const addTask = () => {
    const newTaskName = prompt('Nome:')
    if (newTaskName !== null) {
      appState.push({ taskName: newTaskName, todos: [] })
      render()
    }
  }
  render()
}
