const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?|data(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "data.html"));
});
router.get("/second(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "second.html"));
});
router.get("/redirect(.html)?", (req, res) => {
  res.redirect(301, "/second");
});

module.exports = router;
