const express = require('express');
const router = express.Router();

const authjwt = require('../middleware/authjwt')
const Promotion = require('../models/promotion');
const Profile = require('../models/profile');
const User = require('../models/user');

router.post('/promotions/new', authjwt , async (req, res) => {
    //check privilege
    const user = await User.findById(req.body.id).populate("role")
    if (user.role._id == "62860fa0210230064d61b8c0") {
        // save promotion to database
        console.log(req.body)
        let promotion = new Promotion({
            name: req.body.name,
            iteration: req.body.iteration
        });

        try {
            promotion.save()
            res.send({success: "New promo has been created | promotion id:" + promotion.id})
        } catch (error) {
            res.send({error: error})
        }
    } else {
        console.log(user.role._id)
        res.send({error:"you dont have the sufficent rank to use this route"})
    }
})
module.exports = router;