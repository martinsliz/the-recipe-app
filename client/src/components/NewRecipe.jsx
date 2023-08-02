import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: [],
    instructions: '',
    imageUrl: '',
    cookingTime: 0,
    userOwner: 0
  })

  const navigate = useNavigate()
  const handleChange = (event) => {
    const { name, value } = event.target
    setRecipe({ ...recipe, [name]: value })
  }

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] })
  }
  const handleAddIngredient = (event, idx) => {
    const { value } = event.target
    const ingredients = recipe.ingredients
    ingredients[idx] = value
    setRecipe({ ...recipe, ingredients })
  }

  return (
    <div className="create-recipe">
      <h2>New Recipe</h2>
      <form>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
        ></input>
        <label htmlFor="description">Description: </label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="ingredients">Ingredients: </label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={handleAddIngredient(event, idx)}
          />
        ))}
        <button className="add-ingredient" onClick={addIngredient}>
          Add Ingredient:{' '}
        </button>
        <label htmlFor="instructions">Instructions: </label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        ></input>
        <label htmlFor="cookTime">Cook Time: </label>
        <input
          type="text"
          id="cookTime"
          name="cookTime"
          onChange={handleChange}
        ></input>
      </form>
    </div>
  )
}

export default NewRecipe
