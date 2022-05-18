const mongoose = require ('mongoose');
const { Schema } = mongoose;

const promotionSchema = new Schema({

    name: {
        type: String,  
    },
    iteration: {
        type: Number,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

const Promotion = new mongoose.model('Promotion', promotionSchema)
module.exports = Promotion;