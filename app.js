require("dotenv").config()

const express = require("express")
const path = require("path")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")

const userRouter = require("./controllers/userController")

const mongoDbUri = process.env.MONGODB_URI
mongoose.connect(mongoDbUri)
const db = mongoose.connection
db.on("error", console.error.bind(console, "mongo connection error"))

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }))
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

app.use("/user", userRouter)

app.get("/", (req, res) => res.render("index"))

app.listen(3000, () =>
	console.log("app listening on port 3000!", "http://localhost:3000")
)
