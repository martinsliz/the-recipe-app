import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [cookies, setCookies] = useCookies(['access_token'])
  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])

  const userID = useGetUserID()

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/recipes')
        setRecipes(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        )
        setSavedRecipes(response.data.savedRecipes)
      } catch (err) {
        console.log(err)
      }
    }

    fetchRecipes()
    fetchSavedRecipes()
  }, [])

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        'http://localhost:3001/recipes',
        {
          recipeID,
          userID
        },
        { headers: { authorization: cookies.access_token } }
      )
      setSavedRecipes(response.data.savedRecipes)
    } catch (err) {
      console.log(err)
    }
  }

  const isRecipeSaved = (id) => savedRecipes.includes(id)

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <p>Cook Time: {recipe.cookTime}</p>
              <p>Ingredients: {recipe.ingredients}</p>
            </div>

            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <div>
              <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
            <button
              onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}
            >
              {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
