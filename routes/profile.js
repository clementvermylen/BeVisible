const express = require('express');
const router = express.Router();

const authjwt = require('../middleware/authjwt')
const Profile = require('../models/profile');
const User = require('../models/user');

router.get('/api/test', (req, res) => {
    res.send({data: "heyyyyy my api works here"})
})

router.post('/user/profile/new', authjwt,  async (req, res) => {

    const user = await User.findById(req.body.user_id)
    console.log(req.body.user_id)
    const profile = await new Profile({
        picture: req.body.picture,
        name: req.body.name,
        title: req.body.title,
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
        socials: {
            email: req.body.socials.email,
            github: req.body.socials.github,
            linkedin: req.body.socials.linkedin
        },
    });

    try {
        await profile.save()
        user.profile = profile.id 
        await user.save()
        await res.send({message: `${profile.name}'s profile has been created`})
    } catch (error) {
        res.send({error: error})
    }
})

module.exports = router;