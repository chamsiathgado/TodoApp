import React, { useState } from "react";
import "./App.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Learning React", completed: false },
    { id: 2, text: "Learning TypeScript", completed: false },
    { id: 3, text: "Learning Tailwind CSS", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
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

  return (
    <div className="container">
      <h1>Tasks</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.completed ? "completed" : ""}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
