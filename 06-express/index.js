const express = require("express");
const app = express();
const path = require("path");
const PORT = 3500 || process.env.PORT;
// app.get("/", (req, res) => {
//   // res.send("hello world");
//   // res.sendFile("./pages/data.html", { root: __dirname });
//   res.sendFile(path.join(__dirname, "pages", "data.html"));
// });
app.get("^/$|/data(.html)?|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "data.html"));
});
app.get("/second(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "second.html"));
});
app.get("/redirect(.html)?", (req, res) => {
  res.redirect(301, "/second");
});
app.get(
  "/hello",
  (req, res, next) => {
    res.send("hello");
    next();
  },
  (res, req) => {
    console.log("each get method have one req");
  }
);
const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
  res.send("finished");
};
app.get("/chain(.html)?", [one, two, three]);
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "pages", "404.html"));
});

app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
