const express = require('express');
const router = express.Router();

const authjwt = require('../middleware/authjwt')
const Profile = require('../models/profile');
const User = require('../models/user');

router.post('/user/profile/new', authjwt,  async (req, res) => {
    //check privilege
    const user = await User.findById(req.body.id).populate("role")
    console.log(user)
    if (user.role._id == "62860fa0210230064d61b8c0" || user.role._id == "62860f5f210230064d61b8be") {
        const profile = await new Profile({
            picture: req.body.picture,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            title: {
                frontend: req.body.work.frontend,
                backend: req.body.work.backend
            },
            about: req.body.about,
            status: req.body.status,
            tags: req.body.tags,
            work: {
                position: req.body.work.position,
                duration: req.body.work.duration
            },
            education: {
                school: req.body.education.school,
                graduation: req.body.education.graduation
            },
            interests: req.body.interests,
            cvlink: req.body.cvlink,
            phonenumber: req.body.phonenumber,
            socials: {
                email: req.body.socials.email,
                github: req.body.socials.github,
                linkedin: req.body.socials.linkedin,
                website: req.body.socials.website
            },
        });
    //save profile
        try {
            await profile.save()
            user.profile = profile.id 
            await user.save()
            await res.send({message: `${profile.name}'s profile has been created`})
        } catch (error) {
            res.send({error: error})
        }
    } else {
        console.log(user.role._id)
        res.send({error:"you dont have the sufficent rank to use this route"})
    }
})

router.post('/user/profile/edit', authjwt ,async (req, res) => {
    // check privileges
    const user = await User.findById(req.body.id).populate("role")
    if (user.role._id == "62860fa0210230064d61b8c0" || user.role._id == "62860f5f210230064d61b8be") {
        //edit profile
        try {
            const editedProfile = await Profile.findByIdAndUpdate(user.profile, req.body)
            res.send({success: `profile edited successfully: ${editedProfile}`})
        } catch (error) {
            res.send({error: error})
        }
    } else {
        console.log(user.role._id)
        res.send({error:"you dont have the sufficent rank to use this route"})
    }

})

module.exports = router;