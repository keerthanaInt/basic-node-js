const loggerEvent = require("./loggerEvent");
const productionLogger = require("./productionLogger");

let logger = null;
const log = process.env.NODE_LOG_ENV.trim();

if (log === "logger") {
  logger = loggerEvent();
} else if (log == "production") {
  console.log("production true");
  logger = productionLogger();
}

module.exports = logger;
