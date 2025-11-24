const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const express = require('express');
let router = express.Router();

const User = require('../models/userModel');

router.post('/register', async(req, res)=> {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await User.findOne({username: username});
    if (existingUser) {
      return res.status(400).json({message: "Username already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const newUser = new User({username: username, password: hashedPassword});
    await newUser.save();

    jwt.sign({user: {id: newUser._id}}, process.env.JWT_SECRET, {expiresIn: '30d'}, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({token});
    });
  } catch(error) {
    console.log(error);
    res.status(500).json({message: "Server Error"});
  }
});

router.post('/login', async(req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({message: "Username and password are required"});
    }
    const existingUser = await User.findOne({username: username});
    if (!existingUser) {
      return res.status(400).json({message: "User does not exist"});
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({message: "Incorrect password"});  
    } else {
      jwt.sign({user: {id: existingUser._id}}, process.env.JWT_SECRET, {expiresIn: '30d'}, (err, token) => {
        if (err) {
          throw err;
        }
        res.json({token});
      });
    }

  } catch(error) {
    console.log(error);
    res.status(500).json({message: "Server Error"});
  }
});

module.exports = router;