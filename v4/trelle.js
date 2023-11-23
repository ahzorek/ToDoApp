export default function startTrelleApp(container) {
  let appState = [
    {
      "taskName": "Abertos",
      "todos": [
        {
          "text": "coisa",
          "completed": false
        },
        {
          "text": "segunda coisa",
          "completed": false
        },
        {
          "text": "terceira coisa",
          "completed": false
        }
      ]
    },
    {
      "taskName": "Em andamento",
      "todos": []
    },
    {
      "taskName": "Finalizados",
      "todos": []
    }
  ]

  const render = () => {
    container.innerHTML = `
    <div id="columns">
      ${appState
        .map(
          (column, columnIndex) => `
        <div class="column" data-column-index="${columnIndex}">
          <h2>${column.taskName}</h2>
          <span class="inputTodo">
            <input type="text" placeholder="Adicionar novo item" id="todoInput-${columnIndex}">
            <button class="addTodo" data-column-index="${columnIndex}">➕</button>
          </span>
          <ul>
            ${column.todos
              .map(
                (todo, todoIndex) => `
              <li class="${todo.completed ? 'completed' : ''}" 
                  data-todo-index="${todoIndex}">
                <input type="checkbox" class="toggleTodo" 
                       data-column-index="${columnIndex}" 
                       data-todo-index="${todoIndex}" 
                       ${todo.completed ? 'checked' : ''}>
                <span class="editable" contenteditable="false">${todo.text}</span>
                <div class="buttons">
                  <button class="removeTodo" 
                          data-column-index="${columnIndex}" 
                          data-todo-index="${todoIndex}">❌</button>
                  ${columnIndex < appState.length - 1 ? `
                    <button class="moveTodo" 
                            data-column-index="${columnIndex}" 
                            data-todo-index="${todoIndex}">➡️</button>
                  ` : ''}
                </div>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
      `
        )
        .join('')}
    </div>
  `;

    document.querySelectorAll('.addTodo').forEach(btn => btn.addEventListener('click', addTodo));
    document.querySelectorAll('.removeTodo').forEach(btn => btn.addEventListener('click', removeTodo));
    document.querySelectorAll('.toggleTodo').forEach(checkbox => checkbox.addEventListener('change', toggleTodo));
    document.querySelectorAll('.editable').forEach(span => span.addEventListener('dblclick', enableEditMode));
    document.querySelectorAll('.editable').forEach(span => span.addEventListener('blur', saveTodo));
    document.querySelectorAll('.moveTodo').forEach(btn => btn.addEventListener('click', moveTodo));

    console.log(appState);
  };


  const addTodo = (event) => {
    const columnIndex = event.target.dataset.columnIndex;
    const todoInput = document.getElementById(`todoInput-${columnIndex}`);
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
      appState[columnIndex].todos.push({ text: todoText, completed: false });
      render();
      todoInput.value = '';
    }
  };

  const removeTodo = (event) => {
    const columnIndex = event.target.dataset.columnIndex;
    const todoIndex = event.target.dataset.todoIndex;

    if (columnIndex !== undefined && todoIndex !== undefined) {
      appState[columnIndex].todos.splice(todoIndex, 1);
      render();
    }
  };

  const toggleTodo = (event) => {
    const columnIndex = event.target.dataset.columnIndex;
    const todoIndex = event.target.dataset.todoIndex;

    if (columnIndex !== undefined && todoIndex !== undefined && appState[columnIndex].todos[todoIndex]) {
      appState[columnIndex].todos[todoIndex].completed = event.target.checked;
      render();
    }
  };


  const enableEditMode = (event) => {
    event.target.contentEditable = true;
    event.target.focus();
  };

  const saveTodo = (event) => {
    const columnIndex = event.target.closest('.column').dataset.columnIndex;
    const todoIndex = event.target.closest('li').dataset.todoIndex;

    if (columnIndex !== undefined && todoIndex !== undefined) {
      appState[columnIndex].todos[todoIndex].text = event.target.innerText.trim();
      event.target.contentEditable = false;
      render();
    }
  };

  const moveTodo = (event) => {
    const columnIndex = event.target.dataset.columnIndex;
    const todoIndex = event.target.dataset.todoIndex;

    console.log(columnIndex, todoIndex);

    const todoToMove = appState[columnIndex].todos.splice(todoIndex, 1)[0];
    const nextColumnIndex = parseInt(columnIndex, 10) + 1;

    // Check if there's a next column
    if (appState[nextColumnIndex]) {
      appState[nextColumnIndex].todos.push(todoToMove);
      render();
    }
  };





  render();
}
