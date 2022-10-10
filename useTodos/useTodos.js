import { useReducer, useEffect } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [];

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  let pendingTodosCount, todosCount;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    // todosCount = todos.length;
    // pendingTodosCount = todos.filter((todo) => !todo.done).length;
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "Add Todo",
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "Remove Todo",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    console.log(id);
    dispatch({
      type: "Toggle Todo",
      payload: id,
    });
  };

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter((todo) => !todo.done).length,

    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  };
};
