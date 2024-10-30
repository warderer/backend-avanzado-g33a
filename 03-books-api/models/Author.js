import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: String,
  birthDate: { type: Date }, // YYYY-MM-DD,
  isActive: { type: Boolean, default: true }
}, { timestamps: true }) // Agregar timestamps (createdAt, updatedAt) a cada documento

const Author = mongoose.model('Author', authorSchema)

export default Author
