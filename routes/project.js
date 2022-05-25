const express = require('express');
const router = express.Router();

const authjwt = require('../middleware/authjwt')
const Profile = require('../models/profile');
const Project = require('../models/project');
const User = require('../models/user');

router.post('/user/profile/project/new', authjwt , async (req, res) => {
    //check privilege
    const user = await User.findById(req.body.id).populate("role")
    if (user.role._id == "62860fa0210230064d61b8c0" || user.role._id == "62860f5f210230064d61b8be") {
        //create new project
        try {
            await console.log(req)
            const project = new Project({
                name: req.body.name,
                image: req.body.image,
                link: req.body.link
            })
            project.save()
            const user = await User.findById(req.body.student_id)
            console.log(user)
            const profile = await Profile.findByIdAndUpdate(user.profile._id,{$push: { projects: project }})
            res.send({success: `new project has been added to ${user.profile}`})
            console.log(project)
    
        } catch (err) {
            res.send({error: err})
        }
    } else {
        console.log(user.role._id)
        res.send({error:"you dont have the sufficent rank to use this route"})
    }

})

module.exports = router;