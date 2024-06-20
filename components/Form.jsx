import styles from "./Form.module.css";
import Button from "./Button";
import { useContext } from "react";
import { ThemeContext } from "../pages/index";

export default function Form({ todos, setTodos }) {
  const theme = useContext(ThemeContext).theme;
  const themeOptions = useContext(ThemeContext).themeOptions;

  const handleSubmit = (event) => {
    event.preventDefault();
    const taskName = event.target.task.value;
    const newTodo = {
      taskName: taskName,
      id: self.crypto.randomUUID(),
      isComplete: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    // handle task addition to local storage
    const updatedToDoList = JSON.stringify([...todos, newTodo]);
    localStorage.setItem("todos", updatedToDoList);
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Add task"
        name="task"
        maxLength="36"
        required="required"
      />
      <Button color={themeOptions[theme].primary}>Add</Button>
    </form>
  );
}
