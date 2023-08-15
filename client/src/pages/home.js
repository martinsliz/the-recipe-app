import { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import { RECIPES_URL } from '../globals'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const userID = useGetUserID()
  const [cookies, _] = useCookies(['access_token'])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${RECIPES_URL}`)
        setRecipes(response.data)
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
      } catch (err) {
        console.log(err)
      }
    }
    fetchRecipes()
    fetchSavedRecipes()
  }, [userID])

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `${RECIPES_URL}`,
        {
          recipeID,
          userID
        },
        { headers: { authorization: cookies.access_token } }
      )
      setSavedRecipes(response.data.savedRecipes)
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
                <h5>(Saved to your recipes)</h5>
              ) : (
                <button onClick={() => saveRecipe(recipe._id)}>Save</button>
              )}
            </div>
            <div className="ingredient-input">{recipe.ingredients}</div>
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
