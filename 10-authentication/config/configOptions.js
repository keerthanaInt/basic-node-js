const whiteList = [
  "http://mywebsite.com",
  "http://locahost:3500",
  "http://172.16.1.217:5500",
];
const configOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by cros"));
    }
  },
};
