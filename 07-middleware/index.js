const express = require("express");
const app = express();
const path = require("path");
//cross origin resource sharing
const cors = require("cors");
const { logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = 3500 | process.env.PORT;
app.use(logger);
const whiteList = [
  "http://mywebsite",
  "http://172.16.1.217:5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("NOT ALLOWED BY CROS"));
    }
  },
  originSucessStatus: 200,
};
app.use(cors(corsOptions));
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
//app.use("/static", express.static("public"));
app.get("^/$|data(.html)?|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "data.html"));
});
app.get("/second(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "second.html"));
});
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "pages", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log("Server is running at", PORT);
});
