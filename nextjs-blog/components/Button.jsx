import styles from "./Button.module.css";

export default function Button({ onClick, color, children }) {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
