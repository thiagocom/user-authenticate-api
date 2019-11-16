const { Router } = require("express")

const UserController = require("../controllers/user.controllers")

const router = Router()

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/", UserController.all)

module.exports = router