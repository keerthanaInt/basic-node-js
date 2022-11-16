// const http = require("http");
// const path = require("path");
// const { format } = require("date-fns");
// const { v4: uuid } = require("uuid");
// const fs = require("fs");
// const fsPromises = require("fs").promises;
// const EventEmitters = require("events");
// class Emitter extends EventEmitters {}
// const myEmitter = new Emitter();
// const PORT = process.env.PORT || 3500;

// const server = http.createServer((req, res) => {
//   // console.log(req.url, req.method);
//   let filepath;
//   if (req.url === "/" || req.url === "index.html") {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/html");
//     filepath = path.join(__dirname, "pages", "index.html");
//     fs.readFile(path, "utf8", (err, data) => {
//       if (err) throw err;
//       res.end(data);
//     });
//   }
// });

// server.listen(PORT, () => {
//   console.log("server running on ", PORT);
// });
// const http = require("http");
// const path = require("path");
// const fs = require("fs");
// const PORT = process.env.PORT || 3500;
// const server = http.createServer((req, res) => {
//   let filePath;
//   switch (req.url) {
//     case "/":
//       res.statusCode = 200;
//       res.setHeader("Context-Type", "text/html");
//       filePath = path.join(__dirname, "pages", "index.html");
//       fs.readFile(filePath, "utf8", (err, data) => {
//         if (err) throw err;
//         res.end(data);
//       });
//       break;
//   }
// });
// server.listen(PORT, () => {
//   console.log("server running", PORT);
// });
const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
// initialize object
const myEmitter = new Emitter();
myEmitter.on("logs", (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit("logs", `${err.name}: ${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log("req.url,", req.url, "req.method", req.method);
  myEmitter.emit("logs", `${req.url}\t${req.method}`, "reqLog.txt");

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }
  console.log("contentType", contentType, "req.url", req.url);
  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "pages", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "pages", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "pages", req.url)
      : path.join(__dirname, req.url);
  console.log("filepath", filePath);
  // makes .html extension not required in the browser
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, "pages", "404.html"), "text/html", res);
    }
  }
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));