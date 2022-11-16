const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "index.html"));
});
module.exports = router;
