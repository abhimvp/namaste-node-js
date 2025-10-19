// Modules are protected by default in Node.js
// To expose a function, you need to assign it to module.exports
// Module protects their variables and functions from leaking into global scope

// type modules in package.json
// mjs

// export function calculateSum(a, b) {
//   console.log("Calculating sum of", a, "and", b);
//   const sum = a + b;
//   console.log("Sum is:", sum);
// }
// package.json - type: module - mjs

// commonJs - default
function calculateSum(a, b) {
  console.log("Calculating sum of", a, "and", b);
  const sum = a + b;
  console.log("Sum is:", sum);
}

console.log("Path: seasonOne/Episode-4/namaste-node/sum.js");
console.log("Episode 4 - Sum Module Loaded");

// export var x = "I am a variable inside sum.js - type modules";
var x = "sum.js variable";
console.log("Value of x in sum.js:", x);

console.log(module.exports);

// default - Node.js - type: commonjs
module.exports = {
  x: x,
  calculateSum: calculateSum,
};
