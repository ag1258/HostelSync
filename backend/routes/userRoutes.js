const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
// const userValidation = require("../middlewares/userValidate");
// const userLogin = require("../middlewares/userLogin");

router.post("/signup", userController.register);
router.post("/login", userController.login);
// update info of user
router.post("/update-user/:_id", userController.updateUser);
router.get("/me", verifyToken, userController.getUserDetails);

module.exports = router;