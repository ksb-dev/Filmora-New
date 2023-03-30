const Show = require('../models/Shows')
const { StatusCodes } = require('http-status-codes')

const getShows = async (req, res) => {
  const shows = await Show.find({ createdBy: req.user.userId }).sort(
    'createdAt'
  )

  res.status(StatusCodes.OK).json({ shows, count: shows.length })
}

const addShow = async (req, res) => {
  req.body.show_data.createdBy = req.user.userId

  const show = await Show.create(req.body.show_data)

  res.status(StatusCodes.CREATED).json({ show })
}

const deleteShow = async (req, res) => {
  const show = await Show.findOne({
    id: req.params.id,
    createdBy: req.user.userId
  })
  const deletedMovie = await Show.findByIdAndDelete({
    _id: show._id,
    createdBy: req.user.userId
  })

  res.status(StatusCodes.OK).json({ deletedMovie })
}

module.exports = {
  getShows,
  addShow,
  deleteShow
}
