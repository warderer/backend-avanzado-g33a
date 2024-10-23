import express from 'express'
import { connect } from './config/database.js'

const PORT = process.env.PORT || 3000

const api = express()

api.use(express.json()) // Parsear el body de las peticiones a JSON

// Aquí van las rutas

// Nos conectamos a la base de datos y luego levantamos el servidor
connect().then(() => {
  api.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT} 🚀`)
  })
})
