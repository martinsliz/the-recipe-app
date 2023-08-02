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
    userOwner: userID
  })

  const navigate = useNavigate()
  const handleChange = (event) => {
    const { name, value } = event.target
    setRecipe({ ...recipe, [name]: value })
  }
  return <div>NewRecipe</div>
}

export default NewRecipe
