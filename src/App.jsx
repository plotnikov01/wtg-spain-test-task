import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

import { Calendar, Todo, TodoList } from "./components/index.js";

export const App = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  const [todoList, setTodoList] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");

  const [editedTodoId, setEditedTodoId] = useState(null);
  const [editTodoInput, setEditTodoInput] = useState("");

  useEffect(() => {
    fetchTodoList();
  }, []);

  const handleTitleInput = (e) => {
    e.preventDefault();

    setTodoTitle(e.target.value);
  };

  const handleEditTitleInput = (e) => {
    e.preventDefault();

    setEditTodoInput(e.target.value);
  };

  const fetchTodoList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/todoList");
      setTodoList(response.data);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  };

  const handleTodoSubmit = async (e) => {
    e.preventDefault();

    if (!todoTitle.trim()) {
      return;
    }

    try {
      const newTask = {
        title: todoTitle,
        dueDate: selectDate.toDate().toDateString(),
        completed: false,
      };
      await axios.post("http://localhost:3001/todoList", newTask);
      fetchTodoList();
      setTodoTitle("");
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  const renderTodoList = () => {
    const selectedDateString = selectDate.toDate().toDateString();

    const filteredTasks = todoList.filter(
      (task) =>
        dayjs(task.dueDate).toDate().toDateString() === selectedDateString,
    );

    if (filteredTasks.length === 0) {
      return <p>No tasks for today.</p>;
    }

    const toggleTodoComplete = async (taskId, completedStatus) => {
      try {
        await axios.patch(`http://localhost:3001/todoList/${taskId}`, {
          completed: !completedStatus,
        });
        fetchTodoList();
      } catch (error) {
        console.error("Error toggling completion status:", error);
      }
    };

    const deleteTodo = async (taskId) => {
      try {
        await axios.delete(`http://localhost:3001/todoList/${taskId}`, {});
        fetchTodoList();
      } catch (error) {
        console.error("Error toggling completion status:", error);
      }
    };

    const editTodo = async (taskId) => {
      if (editedTodoId === taskId) {
        if (!editTodoInput.trim()) {
          console.error("Todo title cannot be empty.");
          return;
        }

        try {
          await axios.patch(`http://localhost:3001/todoList/${taskId}`, {
            title: editTodoInput,
          });
          setEditedTodoId(null);
          fetchTodoList();
        } catch (error) {
          console.error("Error editing task:", error);
        }
      } else {
        setEditedTodoId(taskId);
        setEditTodoInput(todoTitle);
      }
    };

    return (
      <ul className="w-full">
        {filteredTasks.map((task) => (
          <Todo
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
            editTodoInput={editTodoInput}
            handleEditTitleInput={handleEditTitleInput}
            toggleTodoComplete={toggleTodoComplete}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            editedTodoId={editedTodoId}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto h-screen items-center sm:flex-row flex-col">
      <Calendar
        days={days}
        today={today}
        setToday={setToday}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        currentDate={currentDate}
      />
      <TodoList
        handleTitleInput={handleTitleInput}
        handleTodoSubmit={handleTodoSubmit}
        renderTodoList={renderTodoList}
        selectDate={selectDate}
        todoTitle={todoTitle}
      />
    </div>
  );
};
