const User = require('../model/User')

const { v4: uuid } = require('uuid')

module.exports = {
  async createUser(request: any, response: any) {
    const { userName, password, tasks } = request.body

    if (!userName || !password || !tasks) {
      console.log('asdasddas')
    } else {
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
}
