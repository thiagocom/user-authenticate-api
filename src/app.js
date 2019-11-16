const express = require("express")
const logger = require("morgan")
const rfs = require("rotating-file-stream")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const userRoutes = require("./routes/user.routes")
const { authenticate } = require("./middlewares")

const app = express()
app.set("port", process.env.PORT || 8000)

if (process.env.NODE_ENV === "production") {
	const accessLogStream = rfs("app.log", {
		size: "10M",
		interval: "1d"
	})
	app.use(logger("combined", { stream: accessLogStream }))
} else {
	app.use(logger("dev"))
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

mongoose.connect(process.env.CONNECT_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
const { connection } = mongoose
connection.on("error", err => console.error(err))
mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)

app.use("/users", userRoutes)

app.use("/protect", authenticate, async (req, res, next) => {
	res.json({ message: "Welcome to development world" })
})

app.use(async (err, req, res, next) => {
	const statusCode = err.statusCode || 500
	res.status(statusCode).json({ message: err.message })
})

module.exports = app