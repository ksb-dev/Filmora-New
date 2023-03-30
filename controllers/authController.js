const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createJWT } = require('../utils')

const register = async (req, res) => {
  const { name, email, password } = req.body

  // Check empty fields
  if (!name || !email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Please fill out all the fields.' })
    return
  }

  // Check if email already exists
  const isEmailExists = await User.findOne({ email })

  if (isEmailExists) {
    res.status(StatusCodes.CONFLICT).json({ message: 'Email already exists' })
    return
  }

  // Register user
  const user = await User.create({ name, email, password })

  // Generate token
  const tokenUser = { name: user.name, id: user._id }

  const token = createJWT({ res, payload: tokenUser })

  // Send user response
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  // Check empty fields
  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Please fill out all the fields.' })
    return
  }

  // Check if entered email exists
  const user = await User.findOne({ email })

  if (!user) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'This email does not exist' })
    return
  }

  // Check if entered password is valid
  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect password' })
    return
  }

  // Generate token
  const tokenUser = { name: user.name, id: user._id }

  const token = createJWT({ res, payload: tokenUser })

  // Send user response
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = { register, login }
