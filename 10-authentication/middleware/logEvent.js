const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const logEvent = async (message, logName) => {
  const data =
    format(new Date(), "ddMMyyyy\t\tHH:MM:SS") +
    "\t" +
    uuid() +
    "\t" +
    message +
    "\n";
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      data
    );
  } catch (error) {
    console.log("error", error);
  }
};
module.exports = logEvent;
