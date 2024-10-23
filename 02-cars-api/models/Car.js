// 1. Importo mongoose
import mongoose from 'mongoose'

// 2. Defino mi esquema de mongoose
const carSchema = new mongoose.Schema({

})

// 3. Creo el modelo de mongoose a partir del esquema
const Car = mongoose.model('Car', carSchema)

export default Car
