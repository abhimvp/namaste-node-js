// fs & https are seperate modules and you'll have to require them to use it.
const fs = require("fs");

const https = require("https");

console.log("Hello World");

var a = 1078698;
var b = 20986;

// Synchronous - blocking
fs.readFileSync("./file.txt", "utf-8");
console.log("File read synchronously - program is paused until file is read");
// fs.readFileSync - Synchronously reads the entire contents of a file. Sync function.
// This will block the main thread until the file is read completely.

// may take 100-200ms
https.get("https://dummyjson.com/products/1", (res) => {
  console.log("Fetched Data Successfully");
  res.resume(); // to consume the response data and free up memory
});

// The issue is with the https.get() call.
// Even though the callback fires and logs "Fetched Data Successfully",
// the HTTP response stream isn't being consumed or closed, so Node.js keeps the event loop alive waiting for it.
// To fix this, you need to properly handle the response stream
// The res.resume() or consuming the data events signals to Node.js that you're done with the HTTP response,
// allowing the connection to close properly and the process to exit.

// takes 5 seconds
setTimeout(() => {
  console.log("setTimeout is callled after 5 seconds");
}, 5000);

// fastest - 10-20ms - when we do fs.readFile it offloads to libuv thread pool
fs.readFile("./file.txt", "utf-8", (err, data) => {
  console.log("File Data: " + data);
});
// fs.readFile - Asynchronously reads the entire contents of a file. Async function.



// Understand that async functions are offloaded to libuv thread pool,
// so they don't block the main thread, whereas sync functions block the main thread until they complete.

// point to note here is the js engine (V8) is single threaded. It still offloads the readFileSync to libuv thread pool,
// but since it's a sync function, it waits for the result before moving to the next line of code.

// As a developer we should never use sync functions in our code as it blocks the main thread, but they're still available for use cases like startup scripts, config file reading, etc.

function multiply(x, y) {
  const result = x * y;
  return result;
}

var c = multiply(a, b);

console.log("multiplication is: " + c);
