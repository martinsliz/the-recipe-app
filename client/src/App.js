import './App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Auth from './pages/auth'
import Navbar from './components/Navbar'
import NewRecipe from './components/NewRecipe'
import SavedRecipes from './components/SavedRecipes'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={
            <Auth
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
        <Route path="/newRecipe" element={<NewRecipe />} />
        <Route path="/savedRecipes" element={<SavedRecipes />} />
      </Routes>
    </div>
  )
}

export default App
