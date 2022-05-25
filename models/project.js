const mongoose = require ('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({

    name: {
        type: String,
    },
    image: [{
        type: String,
    }],
    link: {
        type: String,
    }
});

const Project = new mongoose.model('Project', projectSchema)
module.exports = Project;