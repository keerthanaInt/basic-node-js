const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "subPages", "data.html"));
});
router.get("/test(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "subPages", "test.html"));
});

module.exports = router;
