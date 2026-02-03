const fs = require("fs");
const a = 100;

setImmediate(() => {
  console.log("setImmediate:", a);
});

fs.readFile("./file.txt", "utf8", () => {
  console.log("fs.readFile callback:", a);
});

setTimeout(() => {
  console.log("setTimeout:", a);
}, 0);

function logSync() {
  console.log("Synchronous log:", a);
}

logSync();

console.log("last line of script");

// $ node event-loop-1.js
// Synchronous log: 100 - call Stack
// last line of script - call Stack
// setTimeout: 100 - Timer Phase
// setImmediate: 100 - Check Phase
// fs.readFile callback: 100 - Poll Phase
