import express, { Request, Response, NextFunction } from 'express'
import { UserController } from '../controller/user/UserController'
import { JwtPayload, verify } from 'jsonwebtoken'

class UserMiddlewares {
  async validateUserAndPassword(request: Request, response: Response, next: NextFunction) {
    try {
      const { userName, password } = request.body

      if (!userName || !password) {
        return response.status(400).json({ error: 'Missing userName or password' })
      } else {
        return next()
      }
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  }

  async tokenHandler(request: Request, response: Response) {
    try {
      const { userName, password } = request.body
      const userController = new UserController()

      const token = await userController.login(userName, password)

      return response.json(token)
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  }
  async auth(request: any, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization

    if (!authToken) {
      return response.status(401).json({ message: 'Token is missing' })
    }

    const [, token] = authToken.split(' ')

    try {
      const tokenPayload: string | JwtPayload = verify(
        token,
        '1a7052a6-c711-4c8c-9107-cdc76700b630'
      )
      
      request.user = tokenPayload

      return next()
    } catch (error) {
      return response.status(401).json({
        message: 'Token invalid'
      })
    }
  }
}

export { UserMiddlewares }
