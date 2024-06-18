import Item from "./Item";
import styles from "./List.module.css";
import Button from "./Button";

export default function List({ todos, setTodos, theme, themeOptions }) {
  const handleDeleteAll = () => {
    setTodos([]);
    // set local storage to empty string
    localStorage.setItem("todos", "");
  };

  const handleDeleteDone = () => {
    const updatedTodos = todos.filter((item) => !item.isComplete);
    setTodos(updatedTodos);
    // handle delete done tasks from local storage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className={styles.list}>
      <div className={styles.items_list}>
        {todos.map((item, index) => (
          <Item
            key={index}
            item={item}
            todos={todos}
            setTodos={setTodos}
            theme={theme}
            themeOptions={themeOptions}
          />
        ))}
      </div>
      <div className={styles.delete_buttons}>
        {todos.length !== 0 && (
          <Button color={themeOptions[theme].primary} onClick={handleDeleteAll}>
            Delete All
          </Button>
        )}
        {todos.length !== 0 && (
          <Button
            color={themeOptions[theme].primary}
            onClick={handleDeleteDone}
          >
            Delete All Done Tasks
          </Button>
        )}
      </div>
    </div>
  );
}
