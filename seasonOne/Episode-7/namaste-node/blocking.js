const crypto = require("crypto"); // Node.js core module for cryptographic operations
// const crypto=require('node:crypto'); // alternative way to import the crypto module using the 'node:' prefix, which is a convention in Node.js to indicate that it's a built-in module.
// https://nodejs.org/docs/latest/api/

console.log("Starting the blocking operation...");

var a = 1078698;
var b = 20986;

// synchronous - blocking
crypto.pbkdf2Sync("password", "salt", 500000, 50, "sha512"); // wull block main thread , don't use it
console.log("First Sync Key is generated");
// Don't have call back function because it's a synchronous function, it will block the main thread until the key derivation is complete. This can lead to performance issues if the operation takes a long time, as it prevents other code from executing during that time.

// if we make the 50000 to 500000, it will take more time to generate the key, and the blocking effect will be more pronounced. The main thread will be blocked for a longer duration, preventing any other code from executing until the key derivation is complete. This can lead to a poor user experience and unresponsive applications, especially if the operation takes several seconds or more.

setTimeout(() => {
  console.log("setTimeout is called after 0 seconds");
}, 0); // it will only be called after the blocking operation is complete

// password based key derivation function - pbkdf2Sync is a synchronous version of the pbkdf2 function, which is used to derive a cryptographic key from a password and salt. It takes the following parameters:
crypto.pbkdf2("password", "salt", 50000, 50, "sha512", (err, derivedKey) => {
  console.log("Second Key is generated");
});
// async function - offloaded to libuv thread pool, so it doesn't block the main thread. The callback is called once the key derivation is complete.

function multiply(x, y) {
  const result = x * y;
  return result;
}

var c = multiply(a, b);

console.log("multiplication is: " + c);

// node blocking.js
// Starting the blocking operation...
// First Sync Key is generated - this will take around 500ms to 1 second depending on the machine's performance, as it's a CPU-intensive operation. During this time, the main thread is blocked, and no other code can execute until this operation is complete.
// multiplication is: 22637556228
// Second Key is generated
