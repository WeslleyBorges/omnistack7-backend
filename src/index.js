const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
const mongooseLocalConnection = 'mongodb://localhost/instarocket'
const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true}

mongoose.connect(process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI || mongooseLocalConnection, connectionOptions)

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use(cors())

const picturesPath = path.resolve(__dirname, '..', 'uploads', 'resized')
app.use(express.static(picturesPath))

app.use(require('./routes'))

server.listen(process.env.PORT || 5000)