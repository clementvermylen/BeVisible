const express = require('express');
const router = express.Router();

const authjwt = require('../middleware/authjwt')
const User = require('../models/user');
const Profile = require('../models/profile');

// company routes
router.get('/user/all', authjwt , async (req, res) => {
    //query profile
    try {
        const users = await User.find({ profile: { $ne: null } }).populate("profile").select("profile")
        res.status(200).send({data: users});
    } catch (error) {
        res.send({error: error})
    }



})

router.post('/user/get_one_user', authjwt, async (req, res) => {
    //check privileges
    const user = await User.findById(req.body.id).populate("role")
    if (user && (user.role._id == "62860fa0210230064d61b8c0" || user.role._id == "62860f92210230064d61b8bf")) {
        //query profile
        try {
            const student = await User.findById(req.body.student_id).populate("profile").populate("role")
            const profile = await Profile.findById(student.profile._id).populate("certifications").populate('projects')
            console.log(profile)
            res.status(200).send({data: student.profile, role: student.role, certifications: profile.certifications, projects: profile.projects});
        } catch (err) {
            res.send({error: err})
        }
    } else {
    res.send({error:"you dont have the sufficent rank to use this route"})
    }   
})

// student route
router.post('/user/profile', authjwt , async (req, res) => {
    //query profile
    try {
        const student = await User.findById(req.body.id).populate("profile").populate("role")
        const profile = await Profile.findById(student.profile.id).populate("certifications").populate('projects')
        console.log(profile)
        console.log(profile.certifications)
        res.status(200).send({data: student.profile, role: student.role, certification: profile.certifications, projects: profile.projects});
    } catch (error) {
        res.send({error: error})
    }
})
module.exports = router;
