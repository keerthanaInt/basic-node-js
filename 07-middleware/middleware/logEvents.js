const fs = require("fs");
const fspromises = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const logEvents = async (message, logName) => {
  const logItem =
    format(new Date(), "yyyyMMdd\tHH:MM:SS") +
    "\t" +
    uuid() +
    "\t" +
    message +
    "\t" +
    "\n";
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fspromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fspromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (error) {
    console.log("error", error);
  }
};
const logger = (req, res, next) => {
  logEvents(
    `${req.method}\t ${req.headers.origin}\t ${req.url}`,
    "reqLogEvents.txt"
  );
  console.log(req.method + req.path);
  next();
};
module.exports = { logger, logEvents };
