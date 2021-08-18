const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : { type : String, required : true },
    password : { type : String, required : true },
    role : { type : String, enum : ['user','admin'] },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    dateCreate: { type : Date, default: new Date()}
});

module.exports = mongoose.model('User',UserSchema);