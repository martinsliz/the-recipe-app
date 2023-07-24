import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()
import { UserModel } from '../models/Users.js'

router.get('/', (req, res) => res.send('OK!'))

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  const user = await UserModel.findOne({ username })
  res.json(user)
})

export { router as userRouter }
