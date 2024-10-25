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
    const cars = await Car.find({ isActive: true })
    // const cars = await Car.find({}, { model: 1, brand: 1 }) // Con proyecciones
    res.status(200).json(cars)
  } catch (error) {
    res.status(400).json({ message: 'Error Getting Cars', error })
  }
}

// Get Car by ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.find({ _id: req.params.carId, isActive: true })
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
const deleteCarById = async (req, res) => {
  // Borrado físico: Voy a comprobar si existe un query string llamado 'destroy' y si su valor es 'true' voy a borrar el resitro de la base de datos. ?destroy=true
  if (req.query.destroy === 'true') {
    try {
      const deletedCar = await Car.findByIdAndDelete(req.params.carId)
      if (deletedCar === null) { // Valido si el carro NO existe
        return res.status(404).json({ message: 'Car not found for Delete' })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ message: 'Error Deleting Car', error })
    }
  }

  // Borrado lógico: Cambio el estado de isActive a false (Update -> findByIdAndUpdate())
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.carId, { isActive: false }, { new: false })
    if (updatedCar === null || updatedCar.isActive === false) { // Valido si el carro NO existe o ya está desactivado
      return res.status(404).json({ message: 'Car not found for Delete' })
    }
    return res.status(204).json()
  } catch (error) {
    return res.status(400).json({ message: 'Error Deleting Car', error })
  }
}

export {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById
}
