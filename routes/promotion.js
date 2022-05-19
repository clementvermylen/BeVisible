const express = require('express');
const router = express.Router();

const Promotion = require('../models/promotion');


router.post('/promotions/new', (req, res) => {
    console.log(req.body)
    let promotion = new Promotion({
        name: req.body.name,
        iteration: req.body.iteration
      });
// save promotion to database
    try {
        promotion.save()
        res.send({success: "New promo has been created"})
    } catch (error) {
        res.send({error: error})
    }
})
module.exports = router;