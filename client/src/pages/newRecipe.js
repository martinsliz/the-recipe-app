import { useState } from 'react'

const newRecipe = () => {
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    imageUrl: '',
    cookTime: '',
    userOwner: 0
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewRecipe({ ...recipe, [name]: value })
  }

  const addIngredient = () => {
    setNewRecipe({ ...recipe, ingredients: [] })
  }

  return (
    <div className="create-recipe">
      <h2>New Recipe</h2>
      <form>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="description">Description: </label>
        <textarea id="text" name="description" onChange={handleChange} />
        <label htmlFor="ingredients">Ingredients: </label>
        <button onClick={addIngredient}>Add ingredients</button>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          onChange={handleChange}
        />
        <label htmlFor="instructions">Instructions: </label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        />
        <label htmlFor="imageUrl">Image URL: </label>
        <input type="text" id="name" name="imageUrl" onChange={handleChange} />
        <label htmlFor="cookingTime">Cook Time: </label>
        <input
          type="text"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export default newRecipe
