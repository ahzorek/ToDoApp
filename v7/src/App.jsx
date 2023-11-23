import { useState } from 'react';

const App = () => {
  const [appState, setAppState] = useState([
    {
      taskName: "Desenvolver Landing Pages",
      todos: [
        { text: "Iniciar o design", completed: false },
        { text: "Criar protótipos", completed: false },
        { text: "Codificar as páginas", completed: false },
        { text: "Conduzir testes de usabilidade", completed: false },
        { text: "Publicar as páginas", completed: false }
      ]
    },
    {
      taskName: "Elaborar Relatório de Vendas",
      todos: [
        { text: "Coletar dados de vendas", completed: false },
        { text: "Analisar tendências", completed: false },
        { text: "Preparar o relatório", completed: false },
        { text: "Revisar e corrigir", completed: false },
        { text: "Apresentar aos stakeholders", completed: false }
      ]
    },
    {
      taskName: "Implementar Novo Sistema de Pagamentos",
      todos: [
        { text: "Avaliar soluções existentes", completed: false },
        { text: "Selecionar tecnologias", completed: false },
        { text: "Desenvolver e integrar", completed: false },
        { text: "Testar segurança e desempenho", completed: false },
        { text: "Implantar e monitorar", completed: false }
      ]
    }
  ]);

  const [newTodoTexts, setNewTodoTexts] = useState(Array(appState.length).fill(''));

  const addTodo = (columnIndex) => {
    const todoText = newTodoTexts[columnIndex];
    if (todoText.trim() !== '') {
      setAppState((prevAppState) => {
        const updatedState = [...prevAppState];
        updatedState[columnIndex].todos.push({ text: todoText, completed: false });
        return updatedState;
      });

      setNewTodoTexts((prevTexts) => {
        const updatedTexts = [...prevTexts];
        updatedTexts[columnIndex] = '';
        return updatedTexts;
      });
    }
  };

  const removeTodo = (columnIndex, todoIndex) => {
    setAppState((prevAppState) => {
      const updatedState = [...prevAppState];
      updatedState[columnIndex].todos.splice(todoIndex, 1);
      return updatedState;
    });
  };

  const toggleTodo = (columnIndex, todoIndex) => {
    setAppState((prevAppState) => {
      const updatedState = [...prevAppState];
      updatedState[columnIndex].todos[todoIndex].completed = !updatedState[columnIndex].todos[todoIndex].completed;
      return updatedState;
    });
  };

  const moveTodo = (columnIndex, todoIndex) => {
    setAppState((prevAppState) => {
      const updatedState = [...prevAppState];
      const todoToMove = updatedState[columnIndex].todos.splice(todoIndex, 1)[0];
      const nextColumnIndex = columnIndex + 1;

      if (updatedState[nextColumnIndex]) {
        updatedState[nextColumnIndex].todos = [...updatedState[nextColumnIndex].todos, todoToMove];
      }

      return updatedState;
    });
  };

  const removeTask = (columnIndex) => {
    const todos = appState[columnIndex].todos;

    if (todos.length === 0 || window.confirm("A coluna não está vazia. Tem certeza que deseja removê-la?")) {
      setAppState((prevAppState) => {
        const updatedState = [...prevAppState];
        updatedState.splice(columnIndex, 1);
        return updatedState;
      });
    }
  };

  const renameTask = (columnIndex) => {
    const newTaskName = window.prompt('Nome:', appState[columnIndex].taskName);
    if (newTaskName !== null) {
      setAppState((prevAppState) => {
        const updatedState = [...prevAppState];
        updatedState[columnIndex].taskName = newTaskName;
        return updatedState;
      });
    }
  };

  const addTask = () => {
    const newTaskName = window.prompt('Nome:');
    if (newTaskName !== null) {
      setAppState((prevAppState) => {
        const updatedState = [...prevAppState];
        updatedState.push({ taskName: newTaskName, todos: [] });
        return updatedState;
      });
    }
  };

  return (
    <div id="columns">
      {appState.map((column, columnIndex) => (
        <div className="column" key={columnIndex} data-column-index={columnIndex}>
          <div className="column-header-actions">
            <h2
              title="Clique duplo para renomear"
              data-column-index={columnIndex}
              className="taskTitleName"
              onDoubleClick={() => renameTask(columnIndex)}
            >
              {column.taskName}
            </h2>
            {columnIndex !== 0 && (
              <button className="removeTask" data-column-index={columnIndex} onClick={() => removeTask(columnIndex)}>
                🗑
              </button>
            )}
          </div>
          <span className="inputTodo">
            <input
              type="text"
              placeholder="Adicionar novo item"
              value={newTodoTexts[columnIndex]}
              onChange={(e) => {
                setNewTodoTexts((prevTexts) => {
                  const updatedTexts = [...prevTexts];
                  updatedTexts[columnIndex] = e.target.value;
                  return updatedTexts;
                });
              }}
            />
            <button
              className="addTodo"
              data-column-index={columnIndex}
              onClick={() => addTodo(columnIndex)}
            >
              ➕
            </button>
          </span>
          <ul>
            {column.todos.map((todo, todoIndex) => (
              <li key={todoIndex} className={todo.completed ? 'completed' : ''} data-todo-index={todoIndex}>
                <input
                  type="checkbox"
                  className="toggleTodo"
                  data-column-index={columnIndex}
                  data-todo-index={todoIndex}
                  checked={todo.completed}
                  onChange={() => toggleTodo(columnIndex, todoIndex)}
                />
                <span className="editable" contentEditable={false}>
                  {todo.text}
                </span>
                <div className="buttons">
                  <button className="removeTodo" data-column-index={columnIndex} data-todo-index={todoIndex} onClick={() => removeTodo(columnIndex, todoIndex)}>
                    ❌
                  </button>
                  {columnIndex < appState.length - 1 && (
                    <button
                      className="moveTodo"
                      data-column-index={columnIndex}
                      data-todo-index={todoIndex}
                      onClick={() => moveTodo(columnIndex, todoIndex)}
                    >
                      ⏩
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="column empty" data-column-index={appState.length}>
        <div className="column-header-actions">
          <button className="addTask" data-column-index={appState.length} onClick={addTask}>
            Adicionar coluna
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
