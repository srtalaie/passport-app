const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/user")

// GET User sign-up page
userRouter.get("/sign-up", async (req, res) => {
	res.render("sign_up_form")
})

// Create New User
userRouter.post("/sign-up", async (req, res) => {
	const { username, name, password, email } = req.body

	const pwRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

	if (username.length < 3) {
		return res.status(400).json({
			error: "Username must be at least 3 characters",
		})
	}

	if (!pwRegEx.test(password)) {
		return res.status(400).json({
			error:
				"Password must be at least 8 characters long, contain an upper and lower case character, and contain at least 1 special character",
		})
	}

	const existingUsername = await User.findOne({ username })
	if (existingUsername) {
		return res.status(400).json({
			error: "Username must be unique",
		})
	}

	const existingEmail = await User.findOne({ email })
	if (existingEmail) {
		return res.status(400).json({
			error: "This email is already in use",
		})
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		email,
		passwordHash,
	})

	const savedUser = await user.save()

	res.redirect("/login")
})

// Get Specific User
userRouter.get("/:id", async (req, res) => {
	const user = await User.find({ _id: req.params.id })
	res.json(user)
})

module.exports = userRouter
