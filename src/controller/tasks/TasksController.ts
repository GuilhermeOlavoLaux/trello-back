import User from '../../model/User'

import { Response } from 'express'

import { v4 as uuid } from 'uuid'

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

  async addTask(request: any, response: Response) {
    try {
      const userRequest = request.user
      const { name, description } = request.body

      const user = await User.findById(userRequest.user_id)

      if (name && description) {
        const task = {
          name: name,
          description: description
        }
        user.tasks.push(task)

        await user.save()
        return response.status(200).json({ message: 'Task added successfully' })
      } else {
        return response.status(422).json({ message: 'Missing name or description' })
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async deleteTask(request: any, response: Response) {
    try {
      const userRequest = request.user
      const { taskId } = request.params

      const user = await User.findById(userRequest.user_id)

      if (taskId) {
        const actualUserTasks = user.tasks.filter((task: ITask) => taskId !== task._id.toString())

        user.tasks = actualUserTasks

        await user.save()
        return response.status(200).json({ message: 'Task deleted successfully' })
      } else {
        return response.status(422).json({ message: 'Missing task id' })
      }

      
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export { TasksController }
