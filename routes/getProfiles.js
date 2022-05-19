const express = require('express');
const router = express.Router();

const authjwt = require('../middleware/authjwt')
const User = require('../models/user');
const Profile = require('../models/profile');

// recruiter routes
router.get('/user/all', authjwt , async (req, res) => {
    if (await User.findById(req.body.id).role == "62860fa0210230064d61b8c0" || User.findById(req.body.id).role == "62860f92210230064d61b8bf") {
        try {
            const user = await User.find({}).populate("profile")
            console.log(user)
            res.status(200).send(user);
        } catch (error) {
            res.send({error: error})
        }
    } else {
        let help = await User.findById(req.body.id).role
        console.log(help)
        res.send({error:"you dont have the sufficent rank to use this route"})
    }


})

router.get('/user/get_one_user/:id', async (req, res) => {
    try {
        const student = await User.findById(req.body.id).populate("profile").populate("role")
        console.log(student.role)
        res.status(200).send(student);
    } catch (error) {
        res.send({error: error})
    }
})

// student route
router.get('/user/profile', async (req, res) => {

    try {
        const student = await User.findById(req.body.id).populate("profile")
        console.log(student.profile)
        res.status(200).send({profile: student});
    } catch (error) {
        res.send({error: error})
    }
})
module.exports = router;