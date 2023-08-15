import { RecipeModel } from '../models/Recipes.js'
import { UserModel } from '../models/Users.js'
import express from 'express'
import { verifyToken } from './user.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await RecipeModel.find({})
    console.log(response)
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const recipe = new RecipeModel(req.body)
    const response = await recipe.save()
    console.log(response)
    return res.status(201).json(response)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

router.put('/', verifyToken, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID)
    const user = await UserModel.findById(req.body.userID)
    user.savedRecipes.push(recipe)
    await user.save()
    res.json({ savedRecipes: user.savedRecipes })
  } catch (error) {
    res.json(err)
  }
})

router.get('/savedRecipes/ids/:userID', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID)
    return res.status(201).json({ savedRecipes: user?.savedRecipes })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

router.get('/savedRecipes/:userID', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID)
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes }
    })
    return res.status(201).json({ savedRecipes })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

export { router as recipesRouter }
