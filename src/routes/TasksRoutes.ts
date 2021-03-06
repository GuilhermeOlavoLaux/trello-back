import express from 'express'
import { UserMiddlewares } from '../midllewares/UserMiddlewares'
import { TasksController } from '../controller/tasks/TasksController'
const tasksRouter = express.Router()

const tasksController = new TasksController()

const userMiddlewares = new UserMiddlewares()

tasksRouter.get('/tasks', userMiddlewares.auth, tasksController.getTasks)

tasksRouter.put('/deleteTask/:taskId', userMiddlewares.auth, tasksController.deleteTask)

tasksRouter.put('/addTask', userMiddlewares.auth, tasksController.addTask)

tasksRouter.put('/updateTask', userMiddlewares.auth, tasksController.updateTask)



export = tasksRouter
