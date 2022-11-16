const logEvent = require("./logEvent");
const loggerHandler = (req, res, next) => {
  logEvent(`${req.method}:${req.url}`, "loggerActivity.txt");
  console.log(`${req.method}:${req.url}`);
  next();
};
module.exports = loggerHandler;
