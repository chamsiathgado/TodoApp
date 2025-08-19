import { useState } from 'react'
import TodoItem from './check_todo'

const prefilled = [{ text: 'Apprendre le React', completed: false},
    { text: 'Manger', completed: false},
    { text: 'Dormir', completed: false }];

function Todolist() {
  const [todos, setTodos] = useState(prefilled)
  const [inputValue, setInputValue] = useState('')

  function handleChange(e) {
    setInputValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (inputValue.trim() === '') return
    setTodos([...todos, { text: inputValue.trim(), completed: false }])
    setInputValue('')
  }

  function handleDelete(index) {
    setTodos(todos.filter((_, i) => i !== index))
  }

  function handleToggle(index) {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return (
    <div className='container'>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={inputValue}
          onChange={handleChange}
          placeholder='Entrez une tâche...'
        />
        <button type='submit'>Ajouter une tâche</button>
      </form>
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
