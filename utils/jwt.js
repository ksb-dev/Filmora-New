const jwt = require('jsonwebtoken')

const createJWT = ({ res, payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  })

  return token
}

const verifyJWT = token => jwt.verify(token, process.env.JWT_SECRET)

module.exports = {
  createJWT,
  verifyJWT
}
