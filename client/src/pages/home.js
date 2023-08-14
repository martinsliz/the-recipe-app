import { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import { RECIPES_URL } from '../globals'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const userID = useGetUserID()

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${RECIPES_URL}`)
        setRecipes(response.data)
        // console.log(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `${RECIPES_URL}/savedRecipes/ids/${userID}`,
          {
            userID
          }
        )
        setSavedRecipes(response.data.savedRecipes)
        // console.log(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchRecipes()
    fetchSavedRecipes()
  }, [])

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(`${RECIPES_URL}`, {
        recipeID,
        userID
      })
      setRecipes(response.data)
    } catch (error) {
      console.error(error)
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
              {isRecipeSaved(recipe._id) ? (
                <p>(You've saved this to your recipes)</p>
              ) : (
                <button onClick={() => saveRecipe(recipe._id)}>Save</button>
              )}
            </div>
            <div className="instructions">
              <p>{recipe.ingredients}</p>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cook Time: {recipe.cookTime}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
