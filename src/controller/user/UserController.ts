import { v4 as uuid } from 'uuid'
import User from '../../model/User'

const bcrypt = require('bcrypt')

import jwt from 'jsonwebtoken'

import express from 'express'
import { IUser } from '../../Types'

class UserController {
  async getUsers(request: express.Request, response: express.Response) {
    try {
      const users = await User.find()
      return response.status(200).json({ users })
    } catch (error: any) {
      response.status(500).json({ error: error.message })
    }
  }

  async login(userName: string, password: string) {
    try {
      const users = await User.find()

      const user = users.find((user: IUser) => user.userName === userName)
      if (user === null || user === undefined) {
        throw new Error('User not found')
      }

      if (await bcrypt.compare(password, user.password)) {
        console.log('entrei no lugar2')

        const token = jwt.sign(
          {
            user_id: user._id,
            user_login: user.userName
          },
          'teste',
          {
            expiresIn: '1h'
          }
        )

        return token
      } else {
        throw new Error('Wrong password')
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async createUser(request: express.Request, response: express.Response) {
    const { userName, password, tasks } = request.body

    const users = await User.find()

    if (!userName || !password) {
      return response.status(400).json({ error: 'Missing name or password' })
    }

    let userCreationFlag = false

    users.forEach((user: IUser) => {
      if (user.userName === userName) {
        userCreationFlag = true
      }
    })

    if (userCreationFlag) {
      return response.status(400).json({ rror: 'This user already exists' })
    } else {
      const hashedPassword = await bcrypt.hash(request.body.password, 10)
      const task = new User({
        _id: uuid(),
        userName: userName,
        password: hashedPassword,
        tasks: tasks
      })
      try {
        await task.save()
        return response.status(201).json({ message: 'user created successfully' })
      } catch (error: any) {
        return response.status(400).json({ error: error.message })
      }
    }
  }
}

export { UserController }
