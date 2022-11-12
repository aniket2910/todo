import React, { FormEvent, useState } from "react";
import styles from "./Todo.module.css";
import { TodoType } from "../Types/Dashboard.types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { SingleTodoType } from "../Types/Dashboard.types";

interface Todo {
  item: SingleTodoType;
  handleDelete(id: number): void;
  handleEdit(id: number, todo: SingleTodoType): void;
}

const Todo = ({ item, handleDelete, handleEdit }: Todo) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(item);
  const changeHandleEdit = () => {
    setIsEdit(!isEdit);
  };

  const hadnleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.todo}>
      <div className={styles.title}>
        {isEdit ? (
          <>
            {" "}
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
                id="outlined-basic"
                label="Update Todo..."
                defaultValue={item.todo}
                autoFocus
                variant="outlined"
                name="todo"
                onChange={hadnleChange}
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  handleEdit(item.id, editData);
                  changeHandleEdit();
                }}
              >
                Update
              </Button>
            </form>
          </>
        ) : (
          <p>{item.todo}</p>
        )}
      </div>
      <div className={styles.icons}>
        <div className={styles.icon}>
          {isEdit ? (
            <ClearIcon onClick={changeHandleEdit} />
          ) : (
            <EditIcon onClick={changeHandleEdit} />
          )}
        </div>
        <div className={styles.icon}>
          <DeleteIcon
            onClick={() => {
              handleDelete(item.id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
