import { Schema } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

export const userModel = mongoose.model('users', userSchema)
