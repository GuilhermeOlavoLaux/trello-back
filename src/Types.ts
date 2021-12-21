interface IUser {
  _id: string
  userName: string
  password: string
  tasks: [ITask]
}

interface ITask {
  _id: string
  name: string
  description: string
}


export { IUser, ITask }
