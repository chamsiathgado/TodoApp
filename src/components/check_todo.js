function TodoItem({ todo, index, onDelete, onToggle }) {
  return (
    <li>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => onToggle(index)} 
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(index)}>Supprimer</button>
    </li>
  )
}

export default TodoItem
