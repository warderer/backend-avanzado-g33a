import express from 'express'

import { register } from '../controllers/authController.js'

const authRoutes = express.Router()

// Rutas de autenticación
authRoutes.post('/register', register)

export default authRoutes
