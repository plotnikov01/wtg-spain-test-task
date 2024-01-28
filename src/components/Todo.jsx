import React from "react";
import { Input } from "./Input.jsx";

export const Todo = (props) => {
  const {
    id,
    title,
    completed,
    editedTodoId,
    toggleTodoComplete,
    editTodo,
    deleteTodo,
    editTodoInput,
    handleEditTitleInput,
  } = props;

  return (
    <li className="border-2 p-2 mb-1 flex justify-between gap-4" key={id}>
      {editedTodoId === id ? (
        <Input
          placeholder="Edit Title"
          value={editTodoInput}
          onChange={handleEditTitleInput}
        />
      ) : (
        <strong
          onClick={() => toggleTodoComplete(id, completed)}
          className={
            completed
              ? "line-through cursor-pointer break-all"
              : "cursor-pointer break-all"
          }
        >
          {title}
        </strong>
      )}
      <div className="flex gap-4">
        <button onClick={() => editTodo(id)}>Edit</button>
        <button onClick={() => deleteTodo(id)}>Delete</button>
      </div>
    </li>
  );
};
