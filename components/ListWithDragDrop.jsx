import styles from "./List.module.css";
import Button from "./Button";
import { DndContext } from "@dnd-kit/core";
import { closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { useContext } from "react";
import { ThemeContext } from "../pages/index";

export default function ListWithDragDrop({ todos, setTodos }) {
  const theme = useContext(ThemeContext).theme;
  const themeOptions = useContext(ThemeContext).themeOptions;

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

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const activeIndex = todos.findIndex((todo) => todo.id === active.id);
      const overIndex = todos.findIndex((todo) => todo.id === over.id);
      const updatedTodos = arrayMove(todos, activeIndex, overIndex);
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  }

  return (
    <div className={styles.list}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          <div className={styles.items_list}>
            {todos.map((item, index) => (
              <SortableItem
                key={index}
                item={item}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
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
