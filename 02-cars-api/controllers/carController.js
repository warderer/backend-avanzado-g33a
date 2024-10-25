import Car from '../models/Car.js'

// Create
const createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body) // insert
    res.status(201).json(car)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Read

// Get All Cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find()
    // const cars = await Car.find({}, { model: 1, brand: 1 }) // Con proyecciones
    res.status(200).json(cars)
  } catch (error) {
    res.status(400).json({ message: 'Error Getting Cars', error })
  }
}

// Get Car by ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId)
    res.status(200).json(car)
  } catch (error) {
    res.status(400).json({ message: 'Error Getting Car', error })
  }
}

// Update
const updateCarById = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.carId, req.body, { new: true }) // { new: true } para devolver el documento actualizado, en caso contrario devuelve el documento antes de actualizar
    if (!updatedCar) return res.status(404).json({ message: 'Car not found' })
    res.status(200).json(updatedCar)
  } catch (error) {
    res.status(400).json({ message: 'Error Updating Car', error })
  }
}

// Delete

export {
  createCar,
  getAllCars,
  getCarById,
  updateCarById
}
