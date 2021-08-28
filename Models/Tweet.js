const mongoose = require('mongoose')


const tweetSchema = new mongoose.Schema({

    tweet: {
        type: String,
        maxlength: 140,
		required: true,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
    },
    
    hearts:{
        type: Number,
        default: 0
    }


});

module.exports=mongoose.model('Tweet',tweetSchema);