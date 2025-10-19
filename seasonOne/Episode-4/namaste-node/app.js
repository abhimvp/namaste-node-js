// require("./xyz.js");
require("./sum.js");
console.log("Namaste Node.js");
console.log("Episode 4");
// console.log("Path: seasonOne/Episode-4/namaste-node/app.js");
// type modules in package.json - mjs
// import { x, calculateSum } from "./sum.js";

var a = 10;
var b = 20;
console.log("Values in app.js - a:", a, "b:", b);

// import the calculateSum function from sum.js
const obj = require("./sum.js");

// call the function with a and b
obj.calculateSum(a, b);
// console.log("Value of x imported from sum.js:", obj.x);

const { calculateMultiply } = require("./calculate/multiply.js");
calculateMultiply(a, b);

// make a folder as a module using index.js
const { multiplyByFive, divide } = require("./moduleCalculate");
console.log("Multiply by Five:", multiplyByFive(a));
console.log("Division:", divide(b, a));

// importing json file
const data = require("./data.json");
console.log("Data imported from JSON file:", JSON.stringify(data, null, 2));
console.log("from JSON data:", data);
