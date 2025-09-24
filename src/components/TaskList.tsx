import React from "react";
import TaskItem from "./TaskItem";
import type { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
}

export default function TaskList({ tasks, toggleTask, deleteTask, editTask }: TaskListProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const allCompleted = totalTasks > 0 && pendingTasks === 0;

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
              editTask={editTask}
            />
          ))}
      </ul>

      <div className="stats">
        <p>Total : {totalTasks}</p>
        <p>Terminées ✅ : {completedTasks}</p>
        <p>En cours ⏳ : {pendingTasks}</p>
      </div>

      {allCompleted && (
        <div className="congrats">
          <br />
          🎉 Félicitations ! Toutes les tâches sont terminées ! 🎉
          <br />
        </div>
      )}
    </>
  );
}
