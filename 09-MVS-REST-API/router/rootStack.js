const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|index(.html)?|data(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "data.html"));
});
module.exports = router;
