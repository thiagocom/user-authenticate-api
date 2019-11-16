const jwt = require("jsonwebtoken")

const generate = async id => {
	const token = await jwt.sign({ id }, process.env.SECRET_KEY)
	return token
}

module.exports = { generate }