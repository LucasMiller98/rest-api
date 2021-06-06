const mongoose = require('mongoose')

const User = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // grava o dia e a hora com a data que o arquivo foi criado(createAt e updateAt)
  }
)

module.exports = mongoose.model('users', User)