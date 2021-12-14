import { Error } from "mongoose"

const mongoose = require('mongoose')

function connectToDataBase() {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
  })

  const db = mongoose.connection
  db.on('error', (error: Error) => console.log(error))
  db.once('open', () => console.log('Connected do DB 💽 ✅'))
}

module.exports = connectToDataBase
