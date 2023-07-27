import './App.css'
import { Route, Routes } from 'react-router-dom'
// import axios from 'axios'
import Home from './pages/home'
import Auth from './pages/auth'
import NewRecipe from './pages/newRecipe'
import SavedRecipes from './pages/savedRecipes'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/newRecipe" element={<NewRecipe />} />
        <Route path="/savedRecipes" element={<SavedRecipes />} />
      </Routes>
    </div>
  )
}

export default App
