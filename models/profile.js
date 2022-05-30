const mongoose = require ('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({

    picture: {
        type: String,  
    },
    firstname: {
        type: String,  
    },
    lastname: {
        type: String,  
    },
    title: {
        frontend: String,
        backend: String
    },
    about: {
        type: String,
    },
    status: {
        type: String,
    },
    tags: [{
        type: String,
    }],
    work: {
        position: String,
        duration: String
    },
    education: {
        school: String,
        graduation: String
    },
    interests: {
        type: String,
    },
    cvLink: {
        type: String,  
    },
    phoneNumber: {
        type: String,  
    },
    socials: {
        email: {
            type: String
        },
        github: {
            type: String
        },
        linkedin: {
            type: String,  
        },
        website: {
            type: String,  
        },
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }],
    certifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certification"
    }]
});

const Profile = new mongoose.model('Profile', profileSchema)
module.exports = Profile;