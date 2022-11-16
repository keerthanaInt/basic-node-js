const logEvents = require("./logEvents");
const errorHandler = (error, req, res, next) => {
  logEvents(`${error.name}:${error.message}`, "errorLogActivity.txt");
  console.error(error.stack);
  res.status(404).send(error.message);
};
module.exports = errorHandler;
