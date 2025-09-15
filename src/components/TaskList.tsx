import React from "react";
import TaskItem from "./TaskItem";
import type { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

export default function TaskList({ tasks, toggleTask, deleteTask }: TaskListProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <>
    <ul>
      {[...tasks]
        .sort((a, b) => (b.completed ? 1 : 0) - (a.completed ? 1 : 0))
        .map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))}
    </ul>

    <div className="stats">
      <p>Total : {totalTasks}</p>
      <p>Terminées ✅ : {completedTasks}</p>
      <p>En cours ⏳ : {pendingTasks}</p>
    </div>
    </>
  );
}
