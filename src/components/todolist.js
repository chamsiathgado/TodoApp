import { useState } from 'react'
import TodoItem from './check_todo'
import logo from '../assets/logo4.png'

// Tâches préremplies au démarrage
const prefilled = [
  { text: 'Apprendre le React', completed: false },
  { text: 'Manger', completed: false },
  { text: 'Dormir', completed: false }
]

// Composant principal de la TodoList
function Todolist() {
  const [todos, setTodos] = useState(prefilled)
  const [inputValue, setInputValue] = useState('') // valeur saisie dans l'input

  // Mise à jour de l'input
  function handleChange(e) {
    setInputValue(e.target.value)
  }

  // Ajout d'une nouvelle tâche
  function handleSubmit(e) {
    e.preventDefault()
    if (inputValue.trim() === '') return
    setTodos([...todos, { text: inputValue.trim(), completed: false }])
    setInputValue('') // réinitialisation de l'input
  }

  // Suppression avec animation
  function handleDelete(index) {
    setTodos(prevTodos => {
      const updated = [...prevTodos]
      updated[index].removing = true // flag pour animation CSS
      return updated
    })

    // Suppression définitive après la durée de l'animation
    setTimeout(() => {
      setTodos(prevTodos => prevTodos.filter((_, i) => i !== index))
    }, 400)
  }

  // Cocher/décocher une tâche
  function handleToggle(index) {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
      // Les tâches complétées passent en haut
      return updatedTodos.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? -1 : 1))
    })
  }

  // Modifier le texte d'une tâche
  function handleEdit(index, newText) {
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos]
      updatedTodos[index].text = newText
      return updatedTodos
    })
  }

  // Statistiques
  const totalTasks = todos.length
  const completedTasks = todos.filter(todo => todo.completed).length
  const pendingTasks = totalTasks - completedTasks

  return (
    <div className='container'>
      {/* Bannière avec logo */}
      <div className="todo-banner">
        <img src={logo} alt="logo" className="todo-logo" />
        <h1 className="todo-title">PinkPlanner</h1>
      </div>

      {/* Statistiques */}
      <div className="stats">
        <p>Total : {totalTasks}</p>
        <p>En cours : {pendingTasks}</p>
        <p>Terminées : {completedTasks}</p>
      </div>

      {/* Message Félicitations si toutes les tâches sont terminées */}
      {completedTasks === totalTasks && totalTasks > 0 && (
        <p className="congrats-message">Félicitations ! 🎉</p>
      )}

      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={inputValue}
          onChange={handleChange}
          placeholder='Entrez une tâche...'
        />
        <button type='submit'>Ajouter</button>
      </form>

      {/* Liste des tâches */}
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  )
}

export default Todolist
