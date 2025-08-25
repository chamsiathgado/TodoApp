import React from "react";
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

export default function TaskItem({ task, toggleTask, deleteTask }: TaskItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <span className={task.completed ? "completed" : ""}>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>🗑</button>
    </li>
  );
}
