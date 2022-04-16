const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./api/UserRoutes')
const tasksRouter = require('./api/TasksRoutes')

const conectToDatabase = require('./database')
const cors = require('cors')
require('dotenv').config()

conectToDatabase()

const app = express()
const port = 3030
app.use(cors())
app.use(express.json())
app.use('api/product', userRouter)
app.use('api/product', tasksRouter)

app.listen(port, () => {
  console.log(`Backend started at http://localhost:${port} ✅`)
})
