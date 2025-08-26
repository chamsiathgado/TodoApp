//import d'une poubelle depuis la librarie react-icons
import { MdDeleteForever } from 'react-icons/md'

//fonction composant
function TodoItem({ todo, index, onDelete, onToggle }) {
  return (
    <li>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => onToggle(index)} 
      />
      <span className={todo.completed ? "completed" : ""}> 
        {todo.text}
      </span>
      <MdDeleteForever 
        onClick={() => onDelete(index)}
        className="delete-icon"
      />
    </li>
  )
}

export default TodoItem
