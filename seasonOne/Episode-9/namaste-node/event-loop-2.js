const fs = require("fs");
const a = 999;

setImmediate(() => console.log("setImmediate"));

Promise.resolve("promise").then(console.log)

fs.readFile("./file.txt", "utf-8", (err, data) => {
    console.log(data);
})

setTimeout(() => console.log("setimeout"), 0)

process.nextTick(() => console.log("Process.nexttick"))

function printA() {
    console.log("a:" + a);
}
printA();
console.log("last line of program")

// a: 999 - call Stack
// last line of program - call Stack
// Process.nexttick - next Tick Queue
// promise - Microtask Queue
// setimeout - Timer Phase
// setImmediate - Check Phase
// <file contents> - Poll Phase