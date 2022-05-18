const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Promotion = require('../models/promotion');


router.post('/user/addUserToPromo/promotion', async (req, res) => {
    //     { userid: _id, promoid: _id }
    try {
                //console.log(req.body)
        const student = await User.findById(req.body.userid)
        console.log(student)
        const promo = await Promotion.findByIdAndUpdate(req.body.promoid,{$push: { users: student._id }})
        res.send({success: `${student} has been added to ${promo}`})

    } catch (err) {
        res.send({error: err})
    }
})

module.exports = router;