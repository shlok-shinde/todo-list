const mongoose = require('mongoose');

let todo = mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  deadline: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Todo', todo);