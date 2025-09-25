import { MdDeleteForever } from 'react-icons/md'
import { useState, useEffect } from 'react'

// Composant représentant une tâche individuelle
function TodoItem({ todo, index, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)  // état édition
  const [editValue, setEditValue] = useState(todo.text) // texte temporaire lors de l'édition
  const [animateAdd, setAnimateAdd] = useState(true) // animation d'ajout

  // Supprime la classe "adding" après la durée de l'animation pour éviter un replay
  useEffect(() => {
    const timer = setTimeout(() => setAnimateAdd(false), 400)
    return () => clearTimeout(timer)
  }, [])

  // Soumission de l'édition
  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (editValue.trim() === '') return
    onEdit(index, editValue.trim()) // met à jour le texte via le parent
    setIsEditing(false) // quitte le mode édition
  }

  return (
    // Classe dynamique pour animations ajout ou suppression
    <li className={`${todo.removing ? 'removing' : animateAdd ? 'adding' : ''}`}>
      {/* Checkbox pour cocher/décocher la tâche */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(index)}
      />

      {/* Texte ou input si en mode édition */}
      {isEditing ? (
        <form onSubmit={handleEditSubmit} style={{ display: 'inline' }}>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEditSubmit} // validation si focus perdu
            autoFocus
          />
        </form>
      ) : (
        <span className={todo.completed ? "completed" : ""}>
          {todo.text}
        </span>
      )}

      {/* Conteneur pour les boutons Modifier et Supprimer */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {!isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Modifier
          </button>
        )}
        <MdDeleteForever
          onClick={() => onDelete(index)}
          className="delete-icon"
        />
      </div>
    </li>
  )
}

export default TodoItem
