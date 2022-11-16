const express = require("express");
const router = express.Router();
const registerController = require("../../controller/registerController");
console.log("calling router==>");
router.route("/").post(registerController.handleUsers);

module.exports = router;
