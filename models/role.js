const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema({
    title: {
        type: String,
        //required: true
    }
});

const Roles = new mongoose.model('Role', roleSchema)
module.exports = Roles;
