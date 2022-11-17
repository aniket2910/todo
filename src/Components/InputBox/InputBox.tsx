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

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAdd(todo);
    setTodo({
      ...todo,
      todo: "",
    });
  };
  const inputProps = {
    "data-testid": "todo",
  };
  return (
    <div className={styles.ip_box}>
      <form data-testid="todo_form" onSubmit={handleSubmit}>
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
          inputProps={inputProps}
          required
          onChange={handleChange}
          name="todo"
          id="outlined-basic"
          label="Add Todo..."
          variant="outlined"
          value={todo.todo}
        />
        <Button
          variant="contained"
          data-testid="submit"
          size="small"
          type="submit"
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default InputBox;
