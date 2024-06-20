"use client";

import Head from "next/head";
import Header from "../components/Header";
import TasksDone from "../components/TasksDone";
import Form from "../components/Form";
import List from "../components/List";
import styles from "../styles/Home.module.css";
import ThemePicker from "../components/ThemePicker";
import ListWithDragDrop from "../components/ListWithDragDrop";

import { useState, useEffect, createContext } from "react";

const themeOptions = [
  { primary: "#7B68EE", secondary: "#E6E6FA", name: "Periwinkle" },
  { primary: "#EF974E", secondary: "#FBEADB", name: "Orange" },
  { primary: "#ED68BF", secondary: "#FBE8F5", name: "Pink" },
  { primary: "#90DD67", secondary: "#E8F8E0", name: "Lime" },
  { primary: "#6DCFE0", secondary: "#E1F5F8", name: "Aqua" },
  { primary: "#EACD53", secondary: "#F8F2D1", name: "Yellow" },
];

export const ThemeContext = createContext({ theme: 0 }); // default theme Periwinkle

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState(0);

  // get todos from local storage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedTheme = localStorage.getItem("theme");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      localStorage.setItem("todos", JSON.stringify([]));
    }
    if (storedTheme) {
      setTheme(JSON.parse(storedTheme));
    } else {
      localStorage.setItem("theme", JSON.stringify(0));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>To Do List!</title>
        <link rel="icon" href="/favicon.ico" />
        {/* favicon */}
        <link rel="icon" href={themeOptions[theme].name + "-favicon.svg"} />
        {/* safari icon */}
        <link
          rel="mask-icon"
          href="mask-icon.svg"
          color={themeOptions[theme].primary}
        />
        <link rel="apple-touch-icon" href="apple-touch-icon-png" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div>
        <ThemeContext.Provider
          value={{ theme: theme, themeOptions: themeOptions }}
        >
          <ThemePicker setTheme={setTheme} />
          <Header />
          <TasksDone
            completed_todos={
              todos.filter((todo) => todo.isComplete === true).length
            }
            total_todos={todos.length}
          />
          <Form todos={todos} setTodos={setTodos} />
          <ListWithDragDrop todos={todos} setTodos={setTodos} />
        </ThemeContext.Provider>
      </div>
    </div>
  );
}
