import express from 'express'

const PORT = process.env.PORT || 3000

const api = express()

api.use(express.json()) // Parsear el body de las peticiones a JSON

// Aquí van las rutas

api.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT} 🚀`)
})
