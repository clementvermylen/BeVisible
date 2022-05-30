const express = require('express');
const router = express.Router();

const authjwt = require('../middleware/authjwt')
const User = require('../models/user');
const Profile = require('../models/profile');
const Certification = require('../models/certification');

// { profileid: _id, image: string, message: string, name: string }

router.post('/user/profile/certification/new', cors(), authjwt ,async (req, res) => {
    //check privilege
    const user = await User.findById(req.body.id).populate("role")
    if (user.role._id == "62860fa0210230064d61b8c0") {
        try {
            const certification = new Certification({
                image: req.body.image,
                message: req.body.message,
                date: req.body.date,
                name: req.body.name
            })
    
            certification.save()
    
            const student = await User.findById(req.body.student_id).populate("profile")
            const profile = await Profile.findByIdAndUpdate(student.profile.id,{$push: { certifications: certification }})
            res.send({success: `new certification has been added to ${profile}`})
            console.log(certification   )
    
        } catch (err) {
            res.send({error: err})
        }
    } else {
        console.log(user.role._id)
        res.send({error:"you dont have the sufficent rank to use this route"})
    }
    try {
        const certification = new Certification({
            image: req.body.image,
            message: req.body.message,
            date: req.body.date,
            name: req.body.name
        })

        certification.save()

        const student = await User.findById(req.body.student_id).populate("profile")
        const profile = await Profile.findByIdAndUpdate(student.profile.id,{$push: { certifications: certification }})
        res.send({success: `new certification has been added to ${profile}`})
        console.log(certification   )

    } catch (err) {
        res.send({error: err})
    }
})

module.exports = router;