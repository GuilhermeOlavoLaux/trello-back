const { v4: uuid } = require('uuid')
const User = require('../model/User')
const bcrypt = require('bcrypt')

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

        const user = users.find((user: IUser) => user.userName === userName)

        if (user === null) {
          return response.status(400).send('Cannot find user')
        } else if (await bcrypt.compare(password, user.password)) {
          return response.status(200).json({ user })
        } else {
          return response.status(400).send('Cannot find user')
        }
      }
    } catch (error: any) {
      response.status(500).json({ error: error.message })
    }
  },

  async createUser(request: any, response: any) {
    const { userName, password, tasks } = request.body

    const users = await User.find()

    let userCreationFlag = false

    users.forEach((user: IUser) => {
      if (user.userName === userName) {
        console.log(userName)
        userCreationFlag = true
      }
    })

    if (!userName || !password || !tasks) {
      return response.status(400).json({ error: 'Missing name, password or tasks' })
    }
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
