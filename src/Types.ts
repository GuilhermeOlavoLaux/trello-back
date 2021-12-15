interface IUser {
  _id: string
  userName: string
  password: string
  tasks: [ITask]
}

interface ITask {
  taskId: string
  name: string
  description: string
}

export { IUser, ITask }
