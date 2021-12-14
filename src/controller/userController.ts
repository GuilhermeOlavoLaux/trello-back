const { v4: uuid } = require('uuid')
const User = require('../model/User')

interface IUser {
  _id: string
  userName: string
  password: string
  tasks: [Itask]
}

interface Itask {
  taskId: string
  name: string
  description: string
}

module.exports = {
  async getUsers(request: any, response: any) {
    try {
      const users = await User.find()
      return response.status(200).json({ users })
    } catch (error: any) {
      response.status(500).json({ error: error.message })
    }
  },

  async getUser(request: any, response: any) {
    const { userName, password } = request.body

    try {
      if (!userName || !password) {
        return response.status(400).json({ error: 'Missing name or password' })
      } else {
        const users = await User.find()

        users.forEach((user: IUser) => {
          if (user.userName === userName) {
            return response.status(200).json({ user })
          } else {
            return response.status(400).json({ error: 'User does not exist' })
          }
        })
      }
    } catch (error: any) {
      response.status(500).json({ error: error.message })
    }
  },

  async createUser(request: any, response: any) {
    const { userName, password, tasks } = request.body

    const task = new User({
      _id: uuid(),
      userName: userName,
      password: password,
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
