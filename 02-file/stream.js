const fs = require("fs");
const path = require("path");
const rs = fs.createReadStream(
  path.join(__dirname, "fileData", "Lorem.txt"),
  "utf8"
);
//weite stream we can't use path it's throwing error
const ws = fs.createWriteStream("./fileData/new-lorem.txt");

// rs.on("data", (data) => {
//   ws.write(data);
// });
//both are same re.on and re.pipe
rs.pipe(ws);
