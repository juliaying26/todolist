import { useState } from "react";
import styles from "./Item.module.css";
import Button from "./Button";

export default function Item({ item, todos, setTodos, theme, themeOptions }) {
  const handleCheck = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
    // handle task check from local storage
    const updatedTodos = JSON.stringify(
      todos.map((todo) =>
        todo.id === item.id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
    localStorage.setItem("todos", updatedTodos);
  };

  const handleDelete = () => {
    const updatedTodos = todos.filter((todo) => todo.id !== item.id);
    setTodos(updatedTodos);
    // handle delete from local storage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className={styles.list_item_div}>
      <div
        className={styles.checkbox_and_item}
        onClick={handleCheck}
        style={{ cursor: "pointer" }}
      >
        <svg
          style={
            item.isComplete
              ? { fill: themeOptions[theme].primary }
              : { fill: themeOptions[theme].secondary }
          }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          preserveAspectRatio="xMinYMin"
          cursor="pointer"
        >
          <rect width="28px" height="28px" x="1" y="1" rx="5" ry="5" />
        </svg>
        <p
          style={item.isComplete ? { textDecoration: "line-through" } : {}}
          className={styles.list_item}
        >
          <label style={{ cursor: "pointer" }}>{item.taskName}</label>
        </p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill={themeOptions[theme].primary}
        class="bi bi-trash3-fill"
        viewBox="0 0 16 16"
        onClick={handleDelete}
        cursor="pointer"
      >
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
      </svg>
    </div>
  );
}
