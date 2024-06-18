"use client";

import Head from "next/head";
import Header from "../components/Header";
import TasksDone from "../components/TasksDone";
import Form from "../components/Form";
import List from "../components/List";
import styles from "../styles/Home.module.css";
import ThemePicker from "../components/ThemePicker";

import { useState, useEffect } from "react";

const themeOptions = [
  { primary: "#7B68EE", secondary: "#E6E6FA", name: "Periwinkle" },
  { primary: "#EDB068", secondary: "#FAEEE6", name: "Orange" },
  { primary: "#ED68BF", secondary: "#FAE6F6", name: "Pink" },
  { primary: "#86ED68", secondary: "#EEFAE6", name: "Lime" },
  { primary: "#68CEED", secondary: "#E6F8FA", name: "Aqua" },
  { primary: "#EED468", secondary: "#FAF3E6", name: "Yellow" },
];

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState(0);

  // get todos from local storage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      localStorage.setItem("todos", JSON.stringify([]));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>To Do List!</title>
        <link rel="icon" href="/icon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <ThemePicker
          currentTheme={theme}
          themeOptions={themeOptions}
          setTheme={setTheme}
        />
        <Header />
        <TasksDone
          completed_todos={
            todos.filter((todo) => todo.isComplete === true).length
          }
          total_todos={todos.length}
          theme={theme}
          themeOptions={themeOptions}
        />
        <Form
          todos={todos}
          setTodos={setTodos}
          theme={theme}
          themeOptions={themeOptions}
        />
        <List
          todos={todos}
          setTodos={setTodos}
          theme={theme}
          themeOptions={themeOptions}
        />
      </main>
    </div>
  );
}
