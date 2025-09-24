import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./types";
import "./App.css";

const defaultTasks: Task[] = [
  { id: 1, text: "Learning React", completed: false },
  { id: 2, text: "Learning TypeScript", completed: false },
  { id: 3, text: "Learning Tailwind CSS", completed: false },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const resetTasks = () => {
    setTasks(defaultTasks);
    localStorage.setItem("tasks", JSON.stringify(defaultTasks));
  };

  return (
    <div className="container">
      <h1>Review your Tsks</h1>

      <button onClick={resetTasks} style={{ marginBottom: "10px" }}>
        🔄 Reset to Default
      </button>

      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />

    </div>
  );
}
