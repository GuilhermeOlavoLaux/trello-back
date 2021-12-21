const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/UserRoutes')
const tasksRouter = require('./routes/TasksRoutes')

const conectToDatabase = require('./database')
const cors = require('cors')
require('dotenv').config()

conectToDatabase()

const app = express()
const port = 3030
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(tasksRouter)


app.listen(port, () => {
  console.log(`Backend started at http://localhost:${port} ✅`)
})
