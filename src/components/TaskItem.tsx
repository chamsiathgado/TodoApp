import { useState } from "react";
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
}

export default function TaskItem({ task, toggleTask, deleteTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (editText.trim() !== "") {
      editTask(task.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          />
          <button onClick={handleEdit}>💾</button>
          <button onClick={() => setIsEditing(false)}>❌</button>
        </>
      ) : (
        <>
          <span className={task.completed ? "completed" : ""}>{task.text}</span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
          <button onClick={() => deleteTask(task.id)}>🗑</button>
        </>
      )}
    </li>
  );
}

// import React, { useState } from "react";
// import type { Task } from "../types";

// interface TaskItemProps {
//   task: Task;
//   toggleTask: (id: number) => void;
//   deleteTask: (id: number) => void;
//   editTask: (id: number, newText: string) => void;
// }

// export default function TaskItem({ task, toggleTask, deleteTask, editTask }: TaskItemProps) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedText, setEditedText] = useState(task.text);

//   const handleEdit = () => {
//     if (isEditing && editedText.trim() !== "") {
//       editTask(task.id, editedText);
//     }
//     setIsEditing(!isEditing);
//   };

//   return (
//     <li>
//       <input
//         type="checkbox"
//         checked={task.completed}
//         onChange={() => toggleTask(task.id)}
//       />

//       {isEditing ? (
//         <input
//           type="text"
//           value={editedText}
//           onChange={(e) => setEditedText(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleEdit();
//           }}
//         />
//       ) : (
//         <span className={task.completed ? "completed" : ""}>{task.text}</span>
//       )}

//       <div>
//         <button onClick={handleEdit}>
//           {isEditing ? "💾" : "✏️"}
//         </button>
//         <button onClick={() => deleteTask(task.id)}>🗑</button>
//       </div>
//     </li>
//   );
// }
