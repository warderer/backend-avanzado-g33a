import express from 'express'
import { createBook } from '../controllers/bookController.js'

const bookRoutes = express.Router()

// Rutas de libros
bookRoutes.post('/', createBook)

export default bookRoutes
