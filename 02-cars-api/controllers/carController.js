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

// Update

// Delete

export {
  createCar
}
