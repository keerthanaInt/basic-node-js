const logEvents = require("./logEvents");
const loggerHandler = (req, res, next) => {
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "loggerEvents.txt"
  );
  console.log("url with method=>", req.method, req.url);
  next();
};
module.exports = loggerHandler;
