import Button from "./Button";
import styles from "./ThemePicker.module.css";
import { useState, useContext } from "react";
import { ThemeContext } from "../pages/index";

export default function ThemePicker({ setTheme }) {
  const [showMore, setShowMore] = useState(false);
  const currentTheme = useContext(ThemeContext).theme;
  const themeOptions = useContext(ThemeContext).themeOptions;

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleTheme = (themeIndex) => {
    setTheme(themeIndex);
    localStorage.setItem("theme", JSON.stringify(themeIndex));
  };

  return (
    <>
      <h2>Choose a Theme:</h2>

      <div className={styles.current_theme} onClick={handleShowMore}>
        {/* current theme */}
        {themeOptions.map((theme, index) => {
          return (
            currentTheme === index && (
              <Button
                key={index}
                color={theme.primary}
                onClick={() => handleTheme(index)}
              >
                {theme.name}
              </Button>
            )
          );
        })}
        {/* caret */}
        <div className={styles.caret} onClick={() => handleShowMore()}>
          {!showMore ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={styles.caret}
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={styles.caret}
              viewBox="0 0 16 16"
            >
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg>
          )}
        </div>
      </div>
      {/* other theme buttons */}
      <div className={styles.color_buttons}>
        {showMore ? (
          <div className={styles.color_buttons_after_click}>
            {themeOptions.map((theme, index) => {
              return (
                currentTheme !== index && (
                  <Button
                    key={index}
                    color={theme.primary}
                    onClick={() => handleTheme(index)}
                  >
                    {theme.name}
                  </Button>
                )
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}
