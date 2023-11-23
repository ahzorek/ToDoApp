const todoInput = document.getElementById('todoInput');
const addTodoButton = document.querySelector('button');
const todoList = document.getElementById('todoList');

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    const listItem = document.createElement('li');
    listItem.className = 'flex justify-between';
    listItem.innerText = todoText;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Apagar';

    deleteButton.onclick = function () {
      listItem.remove();
    };

    listItem.appendChild(deleteButton);

    todoList.appendChild(listItem);

    todoInput.value = '';
  }

}