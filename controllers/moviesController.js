const Movie = require('../models/Movies')
const { StatusCodes } = require('http-status-codes')

const getAllWatchlist = async (req, res) => {
  const movies = await Movie.find({ createdBy: req.user.userId }).sort(
    'createdAt'
  )

  res.status(StatusCodes.OK).json({ movies, count: movies.length })
}

const addMovie = async (req, res) => {
  req.body.movie_data.createdBy = req.user.userId

  const movie = await Movie.create(req.body.movie_data)

  res.status(StatusCodes.CREATED).json({ movie })
}

const deleteMovie = async (req, res) => {
  const movie = await Movie.findOne({
    id: req.params.id,
    createdBy: req.user.userId
  })
  const deletedMovie = await Movie.findByIdAndDelete({
    _id: movie._id,
    createdBy: req.user.userId
  })

  res.status(StatusCodes.OK).json({ deletedMovie })
}

module.exports = {
  getAllWatchlist,
  addMovie,
  deleteMovie
}
