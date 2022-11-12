import React, { FormEvent, useState } from "react";
import styles from "./InputBox.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { TodoType } from "../Types/Dashboard.types";

interface HandleAdd {
  handleAdd(todo: TodoType): void;
}

const InputBox: React.FC<HandleAdd> = ({ handleAdd }) => {
  const [todo, setTodo] = useState<TodoType>({
    todo: "",
    status: false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleAdd(todo);
    setTodo({
      ...todo,
      todo: "",
    });
  };
  return (
    <div className={styles.ip_box}>
      <form onSubmit={handleSubmit}>
        <TextField
          size="small"
          fullWidth
          sx={{
            div: {
              background: "#101010",
            },
            input: {
              color: "#fff",
            },
            label: {
              color: "#fff",
            },
          }}
          required
          onChange={handleChange}
          name="todo"
          id="outlined-basic"
          label="Add Todo..."
          variant="outlined"
          value={todo.todo}
        />
        <Button variant="contained" size="small" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default InputBox;
