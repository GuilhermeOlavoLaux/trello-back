const User = require('../model/User')

export = {
  async validateUserCreation(request: any, response: any, next: any) {
    try {
      const { userName, password, tasks } = request.body

      const users = await User.find()


      if (!userName || !password || !tasks) {
        return response.status(400).json({ error: 'Missing name, password or tasks' })
      }

      users.forEach((user: IUser) => {
        if (user.userName === userName) {
          return response.status(400).json({ error: 'This user already exists' })
        }
      })

      next()
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  }
}
