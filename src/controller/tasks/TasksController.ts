import User from '../../model/User'

import { Response } from 'express'

import { ITask, IUser } from '../../Types'

class TasksController {
  async getTasks(request: any, response: Response) {
    try {
      const userRequest = request.user
      const user = await User.findById(userRequest.user_id)

      let userTasks = user.tasks

      return response.status(200).json({ userTasks })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async deleteTask(request: any, response: Response) {
    try {
      const userRequest = request.user
      const { taskId } = request.params

      const user = await User.findById(userRequest.user_id)

      const actualUserTasks = user.tasks.filter((task: ITask) => taskId !== task._id.toString())

      user.tasks = actualUserTasks

      await user.save()

      return response.status(200).json({ message: 'Task deleted successfully' })
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export { TasksController }
