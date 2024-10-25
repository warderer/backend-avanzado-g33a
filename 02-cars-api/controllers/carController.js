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

// Delete

export {
  createCar,
  getAllCars,
  getCarById
}
