import React from "react";
import { Input } from "./Input.jsx";

export const TodoList = (props) => {
  const {
    handleTodoSubmit,
    handleTitleInput,
    renderTodoList,
    selectDate,
    todoTitle,
  } = props;

  return (
    <div className="h-96 w-[400px] max-w-full sm:px-5">
      <h1 className="font-semibold">
        Schedule for {selectDate.toDate().toDateString()}
      </h1>
      <form onSubmit={handleTodoSubmit} className="flex justify-between">
        <Input
          placeholder="Task Title"
          value={todoTitle}
          onChange={handleTitleInput}
        />
        <button type="submit">Add Task</button>
      </form>
      {renderTodoList()}
    </div>
  );
};
