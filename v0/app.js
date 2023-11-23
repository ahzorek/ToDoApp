var todoInput = document.getElementById('todoInput')
var addTodoButton = document.querySelector('button')
var todoList = document.getElementById('todoList')

function addTodo() {
  var todoText = todoInput.value.trim()

  if (todoText !== '') {
    var listItem = document.createElement('li')
    listItem.className = 'flex justify-between'
    listItem.innerText = todoText

    var deleteButton = document.createElement('button')
    deleteButton.innerText = 'Apagar'

    deleteButton.onclick = function () {
      listItem.remove()
    }

    listItem.appendChild(deleteButton)

    todoList.appendChild(listItem)

    todoInput.value = ''
  }

}