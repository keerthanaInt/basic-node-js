const express = require("express");
const app = express();
const path = require("path");
const loggerHandler = require("./middleware/loggerHandler");
const errorHandler = require("./middleware/errorHandler");

app.use(loggerHandler);

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subPages", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routers/homeStack"));
app.use("/subPages", require("./routers/subStack"));

app.use("/employees", require("./routers/api/employees"));
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "pages", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});
app.use(errorHandler);

app.listen(3500, () => console.log(`Server running on port 3500`));
