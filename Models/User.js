const mongoose=require('mongoose')

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
    
	name: String,
	bio: {
		type: String,
		trim: true,
	},
	website: String,
	dob: {
		type: Date,
		default: Date.now
    },

    following: [{ type : ObjectId, ref: 'User' }]

});