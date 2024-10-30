import mongoose from 'mongoose'

const genreEnum = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Horror', 'Thriller', 'Romance', 'Western', 'Dystopian', 'Memoir', 'Biography', 'Autobiography', 'Self-Help', 'Historical', 'Poetry', 'Cookbook', 'Art', 'Science', 'History', 'Travel', 'Children', 'Young Adult', 'Other', 'Technical', 'Textbook']

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  genre: { type: String, required: true, enum: genreEnum },
  publishDate: { type: Date }, // YYYY-MM-DD
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }], // ObjectID es un tipo de dato utilizado por Mongoose para identificar documetos en MongoDB. ref: 'Author' indica que el campo authors hace referencia a la colección Author.
  publisher: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  isbn: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true }) // Agregar timestamps (createdAt, updatedAt) a cada documento

const Book = mongoose.model('Book', bookSchema)

export default Book
