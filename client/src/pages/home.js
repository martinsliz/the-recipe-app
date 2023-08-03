import { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import { RECIPES_URL } from '../globals'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const userID = useGetUserID()

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${RECIPES_URL}`)
        setRecipes(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchRecipes()
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

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                className="save-recipe"
                onClick={() => saveRecipe(recipe._id)}
              >
                Save
              </button>
            </div>
            <div className="instructions">
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
