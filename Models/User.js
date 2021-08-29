const mongoose = require('mongoose')
    // const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },


    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        trim: true,
    },
    website: String,

    following: [{ type: mongoose.Types.ObjectId, ref: 'User' }]

});


module.exports = mongoose.model('User', userSchema);