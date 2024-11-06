/* -- MIDDLEWARES -- */
// Un Middlewarees una función que se ejecute antes de que se ejecute el controlador de una ruta. En este caso, el Middleware isAuth se encarga de verificar si el usuario está autenticado antes de permitirle acceder a una ruta. Si el usuario no está autenticado, se le devuelve un mensaje de error.

import jwt from 'jwt-simple'

const isAuth = (req, res, next) => {
  // Obtener el encabezado Authorization
  const authHeader = req.headers.authorization

  // Verificar si el encabezado Authorization existe
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization header' })
  }

  // Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2NzJhYzhlMGZkYWQzZjM0MjcxNTBkYzAiLCJlbWFpbCI6Imp1bGlhQGdvbWV6LmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzMwODYxNzA0LCJleHAiOjE3MzE0NjY1MDR9.kxpqZLNA9Kf6y2JpjXPLACwdSnPL1vJnWqH20eO4fEo

  // Separar el encabezado Authorization por medio de un arreglo, separandolo por el espacio en blanco.
  const [bearer, token] = authHeader.split(' ')

  // Verificar que el encabezado de authorization comience con 'Bearer'
  if (bearer !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid Authorization header' })
  }

  // Verificar que el token no esté vacío
  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  try {
    // Validar que el token sea valido y no este manipulado
    const payload = jwt.decode(token, process.env.SECRET_KEY)

    // Verificar si el token ha expirado
    const now = Math.floor(Date.now() / 1000) // Fecha actual en segundos
    if (payload.exp <= now) {
      return res.status(401).json({ message: 'Token expired' })
    }

    // Valido el rol del usuario
    req.role = payload.role

    // Si el token es válido, entonces ejecuto el siguiente Middleware o el Controlador de la ruta.
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export { isAuth }
