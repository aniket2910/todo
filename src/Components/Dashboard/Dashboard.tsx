import React, { useEffect, useState } from "react";
import InputBox from "../InputBox/InputBox";
import { SingleTodoType, TodoType } from "../Types/Dashboard.types";
import styles from "./Dashboard.module.css";
import TodoList from "../TodoList/TodoList";

const Dashboard = () => {
  const [todos, setTodos] = useState<SingleTodoType[]>([]);

  const getData = async () => {
    fetch("http://localhost:8080/todos")
      .then((r) => {
        r.json().then((d) => {
          setTodos([...d]);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAdd = (todo: TodoType): void => {
    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    getData();
  };

  const handleDelete = (id: number): void => {
    fetch(`http://localhost:8080/todos/${id}`, { method: "DELETE" })
      .then((r) => {
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEdit = (id: number, todo: SingleTodoType) => {
    console.log(todo);
    fetch(`http://localhost:8080/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then((r) => {
        console.log(r);
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Todo App</h1>
      </div>
      <div data-testid="todo-input" className={styles.todo_app}>
        <InputBox handleAdd={handleAdd} />
      </div>
      <TodoList
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        todos={todos}
      />
    </div>
  );
};

export default Dashboard;
