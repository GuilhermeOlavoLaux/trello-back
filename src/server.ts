const express = require('express')
const mongoose = require('mongoose');
const routes = require('./routes/trelloRoutes')


const conectToDatabase = require('./database')
const cors = require('cors')
require("dotenv").config()

conectToDatabase()

const app = express();
const port = 3030;
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Backend started at http://localhost:${port} ✅`)
})