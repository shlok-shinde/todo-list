const express = require('express');
const router = express.Router();

const Todo = require('../models/todoModel');
const auth = require('../middleware/authMiddleware.js');

router.get('/', auth, async(req, res)=> {
  const todos = await Todo.find({user: req.user.id});
  res.json(todos);

});

router.post('/', auth, async(req, res)=> {
  const {task, description, deadline} = req.body;
  const newTodo = new Todo({task, description, deadline, user: req.user.id});
  await newTodo.save();
  res.json(newTodo);
});

router.delete('/completed', auth, async (req, res) => {
  try {
    // deleteMany is the Mongoose command for bulk deletion
    await Todo.deleteMany({ user: req.user.id, completed: true });
    res.json({ message: 'Completed todos removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/all', auth, async (req, res) => {
  try {
    await Todo.deleteMany({ user: req.user.id });
    res.json({ message: 'All todos removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async(req, res)=> {
  const {task, description, deadline, completed} = req.body;
  const todo = await Todo.findById(req.params.id);
  
  if (!todo) {
    return res.status(404).json({message: "Todo not found"});
  }
  if (todo.user.toString() !== req.user.id) {
    return res.status(401).json({message: "Unauthorized"});
  }
  
  todo.task = task || todo.task;
  todo.description = description || todo.description;
  todo.deadline = deadline || todo.deadline;
  todo.completed = completed !== undefined ? completed : todo.completed;
  await todo.save();
  res.json(todo);
});

router.delete('/:id', auth, async(req, res)=> {
  const todo = await Todo.findById(req.params.id);
  
  if (!todo) {
    return res.status(404).json({message: "Todo not found"});
  }
  if (todo.user.toString() !== req.user.id) {
    return res.status(401).json({message: "Unauthorized"});
  }
  
  await todo.deleteOne(); 
  res.json({message: "Todo removed"});
});

module.exports = router;