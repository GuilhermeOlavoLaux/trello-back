import express from 'express'
import { UserController } from '../controller/user/UserController'
import User from '../model/User'
import { IUser } from '../Types'
const bcrypt = require('bcrypt')

class UserMiddlewares {
  async validateUserAndPassword(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { userName, password } = request.body

      if (!userName || !password) {
        return response.status(400).json({ error: 'Missing name or password' })
      } else {
        return next()
      }
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  }

  async auth(request: express.Request, response: express.Response) {
    try {
      const { userName, password } = request.body
      const userController = new UserController()

      const token = await userController.login(userName, password)

      return response.json(token)
    } catch (error: any) {
        console.log('cai aqui')
      return response.status(500).json({ error: error.message })
    }
  }
}

export { UserMiddlewares }
