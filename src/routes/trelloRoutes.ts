const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const userMidllewares = require('../midllewares/userMiddlewares')

router.get('/users', userController.getUsers)

router.get('/login', userMidllewares.validateUserAndPassword, userController.login)

router.post('/createUser', userMidllewares.validateUserAndPassword, userController.createUser)

export = router
