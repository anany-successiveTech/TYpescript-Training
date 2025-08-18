"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import "@/app/styles/todo.css";

const TodoListMaker = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleOnchnage = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const handleDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="task-container">
        <h1 className="task-title">Task List</h1>
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleOnchnage}
            placeholder="Enter a task"
            className="task-input"
          />
          <button type="submit" className="task-button">
            Add Task
          </button>
        </form>

        <ul className="task-list">
          {todos.map((todo, index) => (
            <li key={index} className="task-item">
              <span>{todo}</span>
              <span className="task-actions">
                <input type="checkbox" />
                <button onClick={() => handleDelete(index)}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoListMaker;
