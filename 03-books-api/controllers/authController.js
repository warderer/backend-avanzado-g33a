/* eslint-disable camelcase */
import User from '../models/User.js'
import bcrypt from 'bcrypt'

// Registrar un nuevo usuario: register
const register = async (req, res) => {
  // Validar que el email, password, first_name y last_name vengan en el body
  const { first_name, last_name, email, password } = req.body
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).send('Process failed: Incomplete data')
  }
  try {
    // Encriptar la contraseña con ayuda de Bcrypt
    const saltRounds = 10 // No. de veces que se aplica el algoritmo de encriptación
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Reemplazar la contraseña de texto plano en el body por la contraseña encriptada
    req.body.password = hashedPassword

    // Crear al usuario en la base de datos
    const newUser = await User.create(req.body)

    // PERO.... debemos eliminar la contraseña del objeto de respuesta por seguridad. Mongo ignora las propiedades que tienene el valor de undefined, por lo que podemos hacer lo siguiente.
    newUser.password = undefined

    return res.status(201).json({ message: 'User registered', newUser })
  } catch (error) {
    res.status(500).json('Error Creating User:', error.message)
  }
}
// Iniciar sesión: login

export { register }
