const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/user/all', async (req, res) => {
    try {
        const students = await User.find({})
        console.log(students)
        res.status(200).send(students);
    } catch (error) {
        res.send({error: error})
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const student = await User.findById(req.body.id)
        res.status(200).send(student);
    } catch (error) {
        res.send({error: error})
    }
})

module.exports = router;