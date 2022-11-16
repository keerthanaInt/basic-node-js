//{----00-----}
console.log("hello world");
//{----01-----}
// const os = require("os");
// const path = require("path");
// console.log("os.type()", os.type());
// console.log("os.version()", os.version());
// console.log("os.homedir", os.homedir());
// console.log("__dirname", __dirname);
// console.log("__filename", __filename);
// //for path we need to pass filename. that mean the particular file path(dirname) and extensions(extname) and whole object(parse) will be written
// console.log("path.dirname(__filename)", path.dirname(__filename)); // __dirname both are same
// console.log("path.extname(__filename)", path.extname(__filename));
// console.log("path.parse(__filename)", path.parse(__filename));
//{----02-----}
const { add, sub, mul, div } = require("./math");
console.log("addition", add(2, 4));
console.log("subtraction", sub(5, 4));
console.log("multiplication", mul(2, 4));
console.log("division", div(10, 2));
