const logEvent = require("./logEvent");
const errorHandler = (error, req, res) => {
  logEvent(`${error.name}:${error.message}`, "errorlogActivity.txt");
  console.error(error.stack);
};
module.exports = errorHandler;
