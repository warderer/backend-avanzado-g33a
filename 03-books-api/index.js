import express from 'express'
import { connect } from './config/database.js'
import bookRoutes from './routes/bookRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

// Aquí van las rutas
app.use('/api/v1/books', bookRoutes)

// Nos conectamos a la base de datos y luego levantamos el servidor
connect().then(() => {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT} 🚀`)
  })
})
