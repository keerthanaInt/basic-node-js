// //nodemon=> to monitor and automatically restart the server
// installation:
// npm i nodemon -g
// to create package file need to use yarn init
//no need to ans any question so that we can use yarn init -y

// console.log("testing!")

//dev dependencies installation npm i packagename --save-dev or npm i package name -D

console.log("first line ");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
console.log(format(new Date(), "yyyyMMdd\tHH:mm"));
console.log(uuid());
//npm packages:example
//"uuid": "^8.3.2"
// 8 is a major version
// 3 is minior version
//2 is a patch
//so here if we user ^ symbal that is i will update minior and patch version
// if i used ~ symbol that mean patch only updated
//if i used * mean overall updated
//example "uuid": "^8.3.2","uuid": "~8.3.2","uuid": "*" when we use "npm update" that time it's will check and update
// if we want to install npm then we need to use "npm rm", "npm uninstall", "npm un"
