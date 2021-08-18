const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    firstname : { type : String },
    lastname :{ type : String },
    email : { type : String },
    phone : { type : String },
    ocupation  : { type : String },
    profileImageURL : { type: String },
    profileImagePublicId : { type: String }
});

module.exports = mongoose.model('Profile',profileSchema, 'profile');