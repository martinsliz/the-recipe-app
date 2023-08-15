import { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import { RECIPES_URL } from '../globals'

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([])
  const userID = useGetUserID()

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `${RECIPES_URL}/savedRecipes/${userID}`,
          {
            userID
          }
        )
        setSavedRecipes(response.data.savedRecipes)
      } catch (err) {
        console.log(err)
      }
    }
    fetchSavedRecipes()
  }, [userID])

  return (
    <div>
      <h2>Your Recipes</h2>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
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

export default SavedRecipes
