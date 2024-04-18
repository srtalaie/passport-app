const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		min: 3,
	},
	name: String,
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: "Email address is required",
		validate: {
			validator(v) {
				return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
			},
			message: "Please enter a valid email",
		},
	},
	passwordHash: {
		type: String,
		required: true,
	},
})

const User = mongoose.model("User", UserSchema)

module.exports = User
