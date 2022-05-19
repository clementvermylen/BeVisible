const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const config = require('../config/auth.js')

const User = require('../models/user');
const Role = require('../models/role');

router.post('/user/signup', async (req, res, next) => {
//sign up student
const user = new User({
  email: req.body.email,
  password: bcrypt.hashSync(req.body.password, 8)
});
  const role = await Role.findOne({title:"student"})
  user.role = role._id
  
await user.save((err, user) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send({ message: "User was registered successfully!" + " " + user._id + " " + role}); 
});
});

//sign in student
router.post("/user/signin", (req,res,next) => {
  User.findOne({
    email: req.body.email
  })
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    
    res.status(200).send({
      id: user._id,
      email: user.email,
      accessToken: token
    });
  });

})

//sign up company
router.post('/company/signup', async (req, res, next) => {

  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
    const role = await Role.findOne({title:"company"})
    user.role = role._id
    
  await user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Company was registered successfully!" + " " + user._id + " " + role}); 
  });
  });

  module.exports = router;