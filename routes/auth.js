const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const config = require('../config/auth.js')

const authjwt = require('../middleware/authjwt')
const User = require('../models/user');
const Role = require('../models/role');

//sign up student
router.post('/user/signup', async (req, res, next) => {

  const users = await User.find({email:req.body.email})
  console.log(users.length)

    if (users.length===0) {

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
        else {
          res.send({ message: "User was registered successfully! " + user._id + " " + role}); 
       }
      });
    }
    else {
      res.send({ error: "A user with this email address already exists"}); 
    }
})




//sign up company
router.post('/company/signup', authjwt , async (req, res, next) => {
    //check privilege
    const admin = await User.findById(req.body.id).populate("role")
    if (admin.role._id == "62860fa0210230064d61b8c0") {

      const users = await User.find({email:req.body.email})
      console.log(users.length)
    
        if (users.length===0) {
    
          const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
          });
            
          const role = await Role.findOne({title:"company"})
          user.role = role._id
          console.log(user._id)
          await user.save((err, user) => {
          if (err) {
            res.status(500).send({ error: err });
            return;
          }
          res.send({ message: "Company was registered successfully! " + user._id + " " + role}); 
          });
        }
        else {
          res.send({ error: "A user with this email address already exists"}); 
        }
    } else {
        console.log(admin.role._id)
        res.send({error:"you dont have the sufficent rank to use this route"})
    }
});

//sign in
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

  module.exports = router;