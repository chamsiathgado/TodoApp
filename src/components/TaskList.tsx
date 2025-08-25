import React from "react";
import TaskItem from "./TaskItem";
import type { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

export default function TaskList({ tasks, toggleTask, deleteTask }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}
