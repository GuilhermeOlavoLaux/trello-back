const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  tasks: [
    {
      taskId: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  ]
})

export = mongoose.model('Trello', userSchema)
