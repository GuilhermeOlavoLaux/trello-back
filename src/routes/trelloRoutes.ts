const express = require('express')
const router = express.Router()
const trelloController = require('../controller/trelloController')

router.post('/createUser', trelloController.createUser)

export = router
