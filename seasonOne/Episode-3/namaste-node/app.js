var name = "Namaste Node.js";

var a = 10;
var b = 20;
console.log("Sum is: ", a + b);

console.log("Welcome to ", name);
console.log("This is Episode 3 of Season 1");

// abhis@Tinku MINGW64 ~/Desktop/backend/namaste-node-js/seasonOne/Episode-3/namaste-node (main)
// $  node app.js
// Sum is:  30
// Welcome to  Namaste Node.js
// This is Episode 3 of Season 1

console.log(global);
// Node.js global object
// $  node app.js
// Sum is:  30
// Welcome to  Namaste Node.js
// This is Episode 3 of Season 1
// <ref *1> Object [global] {
//   global: [Circular *1],
//   clearImmediate: [Function: clearImmediate],
//   setImmediate: [Function: setImmediate] {
//     [Symbol(nodejs.util.promisify.custom)]: [Getter]
//   },
//   clearInterval: [Function: clearInterval],
//   clearTimeout: [Function: clearTimeout],
//   setInterval: [Function: setInterval],
//   setTimeout: [Function: setTimeout] {
//     [Symbol(nodejs.util.promisify.custom)]: [Getter]
//   },
//   queueMicrotask: [Function: queueMicrotask],
//   structuredClone: [Function: structuredClone],
//   atob: [Function: atob],
//   btoa: [Function: btoa],
//   performance: [Getter/Setter],
//   fetch: [Function: fetch],
//   navigator: [Getter],
//   crypto: [Getter]
// }

console.log(this);
// Node.js this keyword prints - {}
console.log(globalThis);
// Node.js globalThis object - refers to global object
console.log(globalThis === global); // true