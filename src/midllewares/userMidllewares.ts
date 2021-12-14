const User = require('../model/User')

export = {
  async validateUserCreation(request: any, response: any, next: any) {
    try {
      const { userName, password, tasks } = request.body

      if (!userName || !password || !tasks) {
        return response.status(400).json({ error: 'Missing name, password or tasks' })
      }

      const users = await User.find()

      let userCreationFlag = false

      users.forEach((user: IUser) => {
        if (user.userName === userName) {
          console.log(userName)
          userCreationFlag = true
        }
      })

      if (userCreationFlag) {
        return response.status(400).json({ error: 'aaaaaaaaaa' })
      }

      next()
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  }
}
