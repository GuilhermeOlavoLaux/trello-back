import express from 'express'
import { UserMiddlewares } from '../midllewares/UserMiddlewares'
import { UserController } from '../controller/user/UserController'
const userRouter = express.Router()

const userController = new UserController()

const userMiddlewares = new UserMiddlewares()

userRouter.post('/login', userMiddlewares.validateUserAndPassword, userMiddlewares.tokenHandler)

userRouter.post('/createUser', userController.createUser)

userRouter.delete('/deleteUser', userMiddlewares.auth, userController.deleteUser)

userRouter.put('/updatePassword', userMiddlewares.auth, userController.updatePassword)

userRouter.get('/testeAutenticacao', userMiddlewares.auth,(request: any, response: any) => {
  return response.status(200).json('get funcionou')
})

export = userRouter
