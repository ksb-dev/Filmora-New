const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./custom-api')

class EmailExists extends CustomAPIError {
  constructor (message) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

module.exports = EmailExists
