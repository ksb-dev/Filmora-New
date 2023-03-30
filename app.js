require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())

// connectDB
const connectDB = require('./db/connect')

// Authentication middleware
const authenticateUser = require('./middleware/authenticateUser')

// Routers
const authRouter = require('./routes/authRouter')
const moviesRouter = require('./routes/moviesRouter')
const showsRouter = require('./routes/showsRouter')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

// routes
app.use('/api/v1/filmora/auth', authRouter)
app.use('/api/v1/filmora/movies', authenticateUser, moviesRouter)
app.use('/api/v1/filmora/shows', authenticateUser, showsRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
