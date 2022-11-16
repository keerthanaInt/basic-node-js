const whiteList = [
  "http://mywebsite",
  "http://172.16.1.217:5500",
  "http://localhost:3500",
];

const configOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed By Cros"));
    }
  },
};
module.exports = configOptions;
