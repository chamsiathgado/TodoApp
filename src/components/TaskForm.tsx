import React, { useState } from "react";

interface TaskFormProps {
  addTask: (text: string) => void;
}

export default function TaskForm({ addTask }: TaskFormProps) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    addTask(newTask);
    setNewTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
