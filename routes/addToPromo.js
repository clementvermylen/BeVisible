const express = require('express');
const router = express.Router();

const authjwt = require('../middleware/authjwt')
const User = require('../models/user');
const Promotion = require('../models/promotion');


router.post('/user/addUserToPromo/promotion', authjwt ,async (req, res) => {
    //check privilege
    const admin = await User.findById(req.body.id).populate("role")
    if (admin.role._id == "62860fa0210230064d61b8c0") {
        try {
            const student = await User.findById(req.body.student_id)
            console.log(student)
            const promo = await Promotion.findByIdAndUpdate(req.body.promo_id,{$push: { users: student._id }})
            res.send({success: `${student} has been added to ${promo}`})
    
        } catch (err) {
            res.send({error: err})
        }
    } else {
        console.log(admin.role._id)
        res.send({error:"you dont have the sufficent rank to use this route"})
    }

})

module.exports = router;