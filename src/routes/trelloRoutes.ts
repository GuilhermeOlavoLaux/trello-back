const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const userMidllewares = require('../midllewares/userMiddlewares')

router.get('/users', userController.getUsers)

router.get('/user', userController.getUser)

router.post('/createUser', userController.createUser)

export = router
