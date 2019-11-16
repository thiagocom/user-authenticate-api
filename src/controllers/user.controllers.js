const User = require("../models/user.models")
const { generate } = require("../utils")

class UserController {

	static async register(req, res) {
		const { username, password } = req.body
		if (!username || !password) {
			return res.status(206).json({ error: "username or password invalid" })	
		}
		if (await User.findOne({ username })) {
			return res.json({ error: "username already in user" })
		}
		const user = await User.create({ username, password })
		const token = await generate(user._id)
		res.status(201).json({ token })
	}

	static async login(req, res) {
		const { username, password } = req.body
		if (!username || !password) {
			return res.status(206).json({ error: "username or password invalid" })
		}
		const user = await User.findOne({ username }).select("+password")
		if (await user.compare(password)) {
			const token = await generate(user._id)
			res.json({ token })
		}
	}

	static async all(req, res) {
		const users = await User.find().select("+password")
		res.json(users)
	}

}

module.exports = UserController