import express from 'express'
import mongoose from 'mongoose'

mongoose.connect('mongodb://root:root@localhost:27017/my_db')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3001, () => {
    console.log('Server is running')
  })