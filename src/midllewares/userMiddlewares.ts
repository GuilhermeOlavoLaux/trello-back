import express from 'express'
import { UserController } from '../controller/user/UserController'
import User from '../model/user'
import { IUser } from '../types'
const bcrypt = require('bcrypt')

class UserMiddlewares {
  async validateUserAndPassword(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { userName, password } = request.body

      const users = await User.find()

      if (!userName || !password) {
        console.log('aaaa')

        return response.status(400).json({ error: 'Missing name or password' })
      }
      const user = users.find((user: IUser) => user.userName === userName)

      if (user === null) {
        console.log('bbbbb')

        return response.status(400).json({ rror: 'User not found' })
      } else if (await !bcrypt.compare(password, user.password)) {
          console.log('cccc')
        return response.status(400).json({ rror: 'Wrong password' })
      } else {
        console.log('ddddd')

        return next()
      }
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  }

  async auth(request: express.Request, response: express.Response) {
    try {
      const { userName, password } = request.body
      console.log(userName, password)
      const userController = new UserController()

      const token = await userController.login(userName, password)

      return response.json(token)
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  }
}

export { UserMiddlewares }
