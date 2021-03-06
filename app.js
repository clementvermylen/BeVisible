// Packages
const express = require('express');
const ejs = require('ejs')
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const cors = require("cors");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const passportlocal = require("passport-local");
const cloudinary = require("cloudinary");
const fileupload = require('express-fileupload')
const dotenv = require('dotenv');

const PORT = process.env.PORT || 3000;

mongoose.promise = global.Promise;

app.use(cors({
    origin: '*'
}));

//ejs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
    const conn = mongoose.connect('mongodb+srv://Clement:OaKBcboZnufXxmvy@bevisibledb.wqxjx.mongodb.net/BeVisible?retryWrites=true&w=majority', { useNewUrlParser: true }, () => {
        console.log('connected to db')
    });
} catch (e) {
    console.log(e)
}

// Routes
app.use('/', require('./routes/auth.js'));
app.use('/', require('./routes/promotion.js'));
app.use('/', require('./routes/addToPromo.js'));
app.use('/', require('./routes/getProfiles.js'));
app.use('/', require('./routes/addCertification.js'));
app.use('/', require('./routes/profile.js'));
app.use('/', require('./routes/project.js'));

app.listen(PORT, () => { console.log('Server started on port 3000') });
module.exports = app;
