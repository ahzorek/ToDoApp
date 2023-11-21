import './style.css';
import { setupTodoApp } from './todo.js';

const todoContainer = document.createElement('div')
todoContainer.setAttribute('id', 'todoAppContainer')
document.querySelector('#app').appendChild(todoContainer)

setupTodoApp(todoContainer)
