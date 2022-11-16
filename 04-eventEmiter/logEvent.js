console.log("hello");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

logEvents = async (message, status) => {
  const data =
    format(new Date(), "yyyyMMdd\tHH:MM:SS") +
    "\t" +
    uuid() +
    "\t" +
    message +
    "\t" +
    status +
    "\n";

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventlog.txt"),
      data
    );
  } catch (error) {
    console.log("error", error);
  }
};
module.exports = logEvents;
