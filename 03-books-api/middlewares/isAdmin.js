const isAdmin = (req, res, next) => {
  if (req.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
}

export { isAdmin }
