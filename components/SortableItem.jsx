import { useSortable } from "@dnd-kit/sortable";
import styles from "./Item.module.css";
import { CSS } from "@dnd-kit/utilities";
import { useContext } from "react";
import { ThemeContext } from "../pages/index";

export default function SortableItem({ item, todos, setTodos }) {
  const theme = useContext(ThemeContext).theme;
  const themeOptions = useContext(ThemeContext).themeOptions;

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

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = { transform: CSS.Transform.toString(transform) };

  return (
    <div style={style}>
      <div className={styles.list_item_div}>
        <div
          className={styles.checkbox_and_item}
          onClick={handleCheck}
          style={{ cursor: "pointer" }}
        >
          {/* checkbox */}
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
          {/* checkmark */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            style={
              item.isComplete
                ? { fill: "#FFFFFF" }
                : { fill: themeOptions[theme].secondary }
            }
            className={styles.checkmark}
            viewBox="0 0 16 16"
          >
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
          </svg>
          <p
            style={item.isComplete ? { textDecoration: "line-through" } : {}}
            className={styles.list_item}
          >
            <label style={{ cursor: "pointer" }}>{item.taskName}</label>
          </p>
        </div>
        <div className={styles.right_side}>
          {/* trash icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={themeOptions[theme].primary}
            className={styles.trash_icon}
            viewBox="0 0 16 16"
            onClick={handleDelete}
            cursor="pointer"
          >
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
          </svg>
          {/* grippy handle for drag drop */}
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={styles.grippy_container}
          >
            <svg
              width="31"
              height="31"
              viewBox="0 0 25 25"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.grippy}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"
                fill="#bfbfbf"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
