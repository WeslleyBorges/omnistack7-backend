const express = require('express')
const PostControler = require('./controllers/PostController')
const multer = require('multer')
const uploadsConfig = require('./config/upload')
const LikeController = require('./controllers/LikeController')

routes = new express.Router()
upload = multer(uploadsConfig)

routes.get('/', (req, res) => {
  res.send('Hello, world!')
})

routes.get('/posts', PostControler.index)
routes.post('/posts', upload.single('image'), PostControler.store)

routes.post('/posts/:id/like', LikeController.store)

module.exports = routes