/* eslint-disable camelcase */
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'

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
const login = async (req, res) => {
  // Validar que el email y el password vengan en el body
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Process failed: Email and Password are required' })
  }

  try {
    // Buscar al usuario con el correo proporcionado en la base de datos.
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Process failed: Email or Password error' })
    }

    // Si el correo existe, entonces comparamos la contraseña proporcionada con la contraseña almacenada en la base de datos.
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    ) // devuelve true o false

    // Si la contraseña no es válida: Error 401: Unauthorized
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Si el correo existe, y la contraseña es correctao, entonces generamos el token de autenticación (JWT)

    // Construimos el payload del token
    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000), // Fecha de creación del token en segundos
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // Fecha de expiración del token en 7 días
    }

    // Construyo el token con el método encode de jwt-simple y la clave secreta
    const token = jwt.encode(payload, process.env.SECRET_KEY)

    // Deolver el token en la respuesta
    return res.status(200).json({ message: 'User logged in', token })
  } catch (error) {
    res.status(500).json('Error Loggin In:', error.message)
  }
}

export { register, login }
