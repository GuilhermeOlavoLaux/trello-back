import express from 'express'
import { UserMiddlewares } from '../midllewares/UserMiddlewares'
import { UserController } from '../controller/user/UserController'
const router = express.Router()

const userController = new UserController()

const userMiddlewares = new UserMiddlewares()

router.get('/users', userController.getUsers)

router.post('/login', userMiddlewares.validateUserAndPassword, userMiddlewares.tokenHandler)

router.post('/createUser', userController.createUser)

router.delete('/deleteUser', userMiddlewares.auth, userController.deleteUser)



router.get('/teste', userMiddlewares.auth, (request: any, response: any) => {
  return response.json('alele')
})

export = router
