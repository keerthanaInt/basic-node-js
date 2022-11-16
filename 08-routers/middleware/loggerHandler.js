const logEvents = require("./logEvents");
const loggerrHandler = (req, res, next) => {
  console.log("=====>");
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "loggerEvents.txt"
  );
  console.log(req.method + req.url);
  next();
};
module.exports = loggerrHandler;
