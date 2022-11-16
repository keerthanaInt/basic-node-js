const logEvents = require("./logEvent");
const EventEmitter = require("events");
class MyEvent extends EventEmitter {}

const MyEmitter = new MyEvent();

MyEmitter.on("log", (msg, status) => logEvents(msg, status));

setTimeout(() => {
  MyEmitter.emit("log", "log event emitted", "success");
}, 2000);
