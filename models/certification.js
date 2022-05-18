const mongoose = require ('mongoose');
const { Schema } = mongoose;

const certificationSchema = new Schema({

    image: {
        type: String,  
    },
    message: {
        type: String,
    },
    date: {
        type: Number,
    },
    name: {
        type: String,
    }
});

const Certification = new mongoose.model('Certification', certificationSchema)
module.exports = Certification;