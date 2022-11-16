const express = require("express");
const app = express();
const path = require("path");
const PORT = 3500 || process.env.PORT;
const logger = require("./middleware/logger");
const verifyJWT = require("./middleware/auth/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/auth/credentials");
app.use(credentials);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./router/root"));
app.use("/register", require("./router/api/register"));
app.use("/login", require("./router/api/auth"));
app.use("/refresh", require("./router/api/refresh"));
app.use("/logout", require("./router/api/logout"));
app.use(verifyJWT);
app.use("/employee", require("./router/api/employees"));
app.all("*", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "pages", "404.html"));
    logger.error(`${req.method}:${req.url}`);
  } else if (req.accepts("json")) {
    res.json({ statusmessage: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.listen(PORT, () => {
  console.log("server running at", +PORT);
});
