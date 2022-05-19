const express = require('express');
const router = express.Router();

const Profile = require('../models/profile');
const Certification = require('../models/certification');

// { profileid: _id, image: string, message: string, name: string }

router.post('/user/addCertification', async (req, res) => {
    try {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        const certification = new Certification({
            image: req.body.image,
            message: req.body.message,
            date: today,
            name: req.body.name
        })

        const profile = await Profile.findByIdAndUpdate(req.body.profileid,{$push: { certifications: certification }})
        res.send({success: `${certification} has been added to ${profile}`})
        console.log(certification)

    } catch (err) {
        res.send({error: err})
    }
})

module.exports = router;