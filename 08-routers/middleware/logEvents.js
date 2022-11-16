const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const logEvents = async (message, logName) => {
  const data = `${format(
    new Date(),
    "yyyyMMdd\tHH:MM:SS"
  )}\t${uuid()}\t${message}\n`;
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const logItem2 =
    format(new Date(), "yyyyMMdd\tHH:MM:SS") +
    "\t" +
    uuid() +
    "\t" +
    message +
    "\t" +
    "\n";
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      console.log("creating log folder");
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    console.log("creating file", logName);
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      data
    );
  } catch (error) {
    console.log("error", error);
  }
};
module.exports = logEvents;
