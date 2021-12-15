const express = require('express')
const router = express.Router()
const { UserMiddlewares } = require('../midllewares/userMiddlewares')
import { UserController } from '../controller/user/UserController'

const userController = new UserController()

const userMiddlewares = new UserMiddlewares()

router.get('/users', userController.getUsers)

router.post('/login', userMiddlewares.validateUserAndPassword, userMiddlewares.auth)

router.post('/createUser', userController.createUser)

export = router
