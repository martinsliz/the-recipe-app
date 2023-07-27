import React from 'react'
import { Link } from 'react-router-dom'

const nav = () => {
  return (
    <div className="navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/auth">Register / Login</Link>
        <Link to="/newRecipe">New Recipe</Link>
        <Link to="/savedRecipes">My Recipes</Link>
      </div>
    </div>
  )
}

export default nav
