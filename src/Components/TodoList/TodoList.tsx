import React from "react";
import styles from "./TodoList.module.css";
import { SingleTodoType, TodoType } from "../Types/Dashboard.types";
import Todo from "../Todo/Todo";

interface Props {
  todos: SingleTodoType[];
  handleDelete(id: number): void;
  handleEdit(id: number, todo: SingleTodoType): void;
}

const TodoList = ({ todos, handleDelete, handleEdit }: Props) => {
  return (
    <div className={styles.todos}>
      {todos.map((item) => (
        <Todo
          key={item.id}
          item={item}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
