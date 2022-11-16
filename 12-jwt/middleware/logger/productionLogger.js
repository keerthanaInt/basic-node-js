const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, json } = format;

const productionLogger = () => {
  console.log("production calling");
  return createLogger({
    level: "debug",
    // format: winston.format.simple(),
    format: combine(timestamp(), uuid(), json()),

    defaultMeta: { service: "user-service" },
    transports: [
      new transports.Console(),
      new transports.File({
        filename: "logs/productionError.log",
      }),
    ],
  });
};

module.exports = productionLogger;
