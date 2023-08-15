import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()
import { UserModel } from '../models/Users.js'

router.get('/', (req, res) => res.send('OK!'))

router.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find()
    return res.status(200).json({ users })
  } catch (error) {
    console.error(error)
  }
})

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  const user = await UserModel.findOne({ username })
  if (user) {
    return res.json({ message: 'User already exists!' })
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new UserModel({ username, password: hashedPassword })
  await newUser.save()
  res.json({ message: 'User Registered Successfully!' })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await UserModel.findOne({ username })
  if (!user) {
    return res.json({ message: 'No such user!' })
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.json({ message: 'Username or Password is Incorrect!' })
  }
  const token = jwt.sign({ id: user._id }, 'secret')
  res.json({ token, userID: user._id })
})

export { router as userRouter }

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, 'secret', (err) => {
      if (err) return res.sendStatus(403)
      next()
    })
  } else {
    res.sendStatus(401)
  }
}
