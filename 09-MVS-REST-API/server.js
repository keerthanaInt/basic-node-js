const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const loggerHandler = require("./middleware/loggerHandler");
const errorHandler = require("./middleware/errorHandler");
const configOptions = require("./config/configOptions");
const PORT = 3500 || process.env.PORT;

app.use(loggerHandler);
app.use(cors(configOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./router/rootStack"));
app.use("/employee", require("./router/api/employee"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "pages", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server is running at", PORT);
});
