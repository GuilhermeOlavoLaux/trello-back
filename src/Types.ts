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
  situation: string
}


export { IUser, ITask }
