import Author from '../models/Author.js'
import Book from '../models/Book.js'

// CREATE
const createBook = async (req, res) => {
  const bookData = req.body

  // VALIDACIONES
  // Validar que el body no venga vacío
  if (Object.keys(bookData).length === 0) {
    return res.status(400).json({ message: 'Book data is required' })
  }

  // Validar que Authors sea un arreglo
  if (!Array.isArray(bookData.authors)) {
    return res.status(400).json({ message: 'Authors must be an array' })
  }

  // Validar que Authors contenga al menos un autor
  if (bookData.authors.length === 0) {
    return res.status(400).json({ message: 'At least one author is required' })
  }

  // Crear autores, uno por uno y esperar a que todos se hayan creado en la colección.
  try {
    const authorModels = await Promise.all(bookData.authors.map(async author => {
      // Si el autor ya existe, devolverlo; sino crearlo.
      const existingAuthor = await Author.findOne({ firstName: author.firstName, lastName: author.lastName, birthDate: author.birthDate })

      if (existingAuthor) {
        return existingAuthor
      }

      // Si el autor no existe, se crea uno nuevo.
      const newAuthor = new Author(author)
      return await Author.create(newAuthor)
    }))

    // Como ya guardamos a los autores, ya podemos asignarlos al libro. Y para ello necesitamos los ObjectID (_id) de los autores.
    bookData.authors = authorModels.map(author => author._id)

    // Crear el libro con los ids de los autores.
    const newBook = await Book.create(bookData)
    res.status(201).json(newBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// READ

// UPDATE

// DELETE

export { createBook }
