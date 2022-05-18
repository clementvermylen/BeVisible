const mongoose = require ('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    email: {
        type: String,
        //required: true
    },
    password: {
        type: String,
        //required: true
    },
    role: {
        type: String
    },
    promotion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Promotion"
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    }
});

const User = new mongoose.model('User', userSchema)
module.exports = User;