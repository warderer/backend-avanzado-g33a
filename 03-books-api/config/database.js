import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config() // Leer las variavbles de entorno del archivo .env

const connect = async () => {
  try {
    mongoose.connect(process.env.DB_CONNECT_URI) // Nos conectamos a la base de datos
    const { connection } = await mongoose // Traemos la conexión de mongoose

    connection.once('open', () => {
      console.log('✅ DB Connection Sucessful') // Si la conexión se abre, mostramos un mensaje
    })

    connection.on('error', (error) => { // Si hay un error en la conexión, mostramos un mensaje
      console.log('❌ DB Connection Error:', error)
    })
  } catch (error) {
    console.log('🍿 DB Connection Error:', error)
  }
}

export { connect }
