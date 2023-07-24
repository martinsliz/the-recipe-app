import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import { userRouter } from '../routes/user.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', userRouter)

mongoose.connect(process.env.MONGODB_URI)

app.listen(3001, () => console.log('Listening on Port 3001'))
