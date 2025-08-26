//importation du hook useSate depuis React pour gerer les etats des composants
import { useState } from 'react'
import TodoItem from './check_todo' //gestion des taches
import '../styles/Banner.css' //utilisation du style concernant le texte et le logo
import logo from '../assets/logo4.png'   // le logo

//tableau d'objets pour les taches preremplies
const prefilled = [
  { text: 'Apprendre le React', completed: false},
  { text: 'Manger', completed: false},
  { text: 'Dormir', completed: false }
];
//composant principal
function Todolist() {
  const [todos, setTodos] = useState(prefilled) /*destructuration*/
  const [inputValue, setInputValue] = useState('')
//Fonction de gestion des modifications appliquees a l'input
  function handleChange(e) {
    setInputValue(e.target.value)
  }
//Fonction de gestion des evenements quand on veut ajouter une tache
  function handleSubmit(e) {
    e.preventDefault()
    if (inputValue.trim() === '') return
    setTodos([...todos, { text: inputValue.trim(), completed: false }])
    setInputValue('')
  }
//Pour les evenements du bouton supprimer 
  function handleDelete(index) {
    setTodos(todos.filter((_, i) => i !== index))
  }
//Permettre de cocher ou de decocher une tache(basculer entre deux etats)
  function handleToggle(index) {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }
  return (
    /*styliser la mise en page globale*/
  <div className='container'>
      {/* ✅ Banner avec logo + titre */}
      <div className="todo-banner">
        <img src={logo} alt="logo" className="todo-logo" />
        <h1 className="todo-title">PinkPlanner</h1>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={inputValue}
          onChange={handleChange}
          placeholder='Entrez une tâche...'
        />
        <button type='submit'> Ajouter </button>
      </form>

      {/* Liste */}
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </ul>
    </div>
  )
}

export default Todolist
