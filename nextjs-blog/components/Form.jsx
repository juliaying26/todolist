import styles from "./Form.module.css";
import Button from "./Button";

export default function Form({ setTodos, theme, themeOptions }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const taskName = event.target.task.value;
    setTodos((prev) => [
      ...prev,
      { taskName: taskName, id: self.crypto.randomUUID(), isComplete: false },
    ]);
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
