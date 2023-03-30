const express = require('express')
const router = express.Router()

const {
  getShows,
  addShow,
  deleteShow
} = require('../controllers/showsController')

router.get('/', getShows)
router.post('/', addShow)
router.delete('/:id', deleteShow)

module.exports = router
