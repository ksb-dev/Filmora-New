const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema(
  {
    id: {
      type: Number
    },

    type: {
      type: String
    },

    title: {
      type: String
    },

    poster_path: {
      type: String
    },

    backdrop_path: {
      type: String
    },

    vote_average: {
      type: Number
    },

    release_date: {
      type: String
    },

    genre_ids: {
      type: Array
    },

    overview: {
      type: String
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },

  { timestamps: true }
)

module.exports = mongoose.model('Movie', MovieSchema)
