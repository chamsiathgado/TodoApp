import '../styles/App.css'; //afin d'utiliser les propriétés appliquées au background
import Todolist from './todolist' //import de la fonction contenue dans todolist.js

//Composant principal de l'application
function App() {
  return (
    /*Assignation de la classe Css contenue dans "app-background" au contenu de la balise div */ 
    <div className="app-background"> 
    <Todolist /> 
    </div>
  )
}

export default App;
