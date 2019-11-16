const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new Schema({
	username: {
		type: String, required: true, unique: true
	},
	password: {
		type: String,
		select: false
	}
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })

UserSchema.methods.compare = async function(password) {
	const res = await bcrypt.compare(password, this.password)
	return res
}

UserSchema.pre("save", async function(next) {
	try {
		const hash_password = await bcrypt.hash(this.password, 10)
		this.password = hash_password
		next()
	} catch (err) {
		next(err)
	}
	
})

module.exports = model("Users", UserSchema)