const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next) => {
	const authorization = req.get("Authorization")
	if (!authorization) {
		res.json({ error: "authorization token not exist" })
	}
	try {
		const decoded = await jwt.verify(authorization, process.env.SECRET_KEY)
		next()
	} catch (err) {
		res.json({ error: "token invalid "})
	}
}

module.exports = { authenticate }