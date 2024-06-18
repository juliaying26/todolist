import styles from "./TasksDone.module.css";

export default function TasksDone({
  completed_todos,
  total_todos,
  theme,
  themeOptions,
}) {
  let percentage = completed_todos / total_todos;
  return (
    <div className={styles.tasks_done}>
      {completed_todos} / {total_todos} tasks completed
      <div className={styles.completion_bar}>
        <svg viewBox="0 0 430 14">
          <rect
            width="430px"
            height="14px"
            fill={themeOptions[theme].secondary}
          ></rect>
          <rect
            width={430 * percentage + "px"}
            height="14px"
            fill={themeOptions[theme].primary}
          ></rect>
        </svg>
      </div>
    </div>
  );
}
