const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
  // Check Header

  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Authentication Invalid' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // Attatch the user to the job routes
    req.user = { userId: payload.id, name: payload.name }
    next()
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Authentication Invalid' })
  }
}

module.exports = authenticateUser
