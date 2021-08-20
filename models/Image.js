const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name : { type : String },
    description : { type : String },
    imageURL : { type : String },
    public_id : { type: String },
    dateCreate : { type: Date, default: new Date()},
    coments : [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String },
        date: { type: Date, default: new Date()}
    }]
});

module.exports = mongoose.model('Image',imageSchema, 'image');