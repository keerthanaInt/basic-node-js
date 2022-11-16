const fs = require("fs");
if (fs.existsSync("./new")) {
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("directory removed successfully");
  });
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("directory created successfully");
  });
} else {
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("directory created successfully");
  });
}
