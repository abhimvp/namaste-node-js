console.log("Hello World");

var a = 1078698;
var b = 20986;

setTimeout(() => {
  console.log("call me ASAP");
}, 0);

function multiply(x, y) {
  const result = x * y;
  return result;
}

var c = multiply(a, b);

console.log("multiplication is: " + c);
// Even though the setTimeout is set to 0 milliseconds, it doesn't execute immediately.
// This is because setTimeout callbacks are placed in the timer queue,
// which is processed only after the current call stack is empty.
// Therefore, the multiply function and its console.log complete first,
// and then the setTimeout callback is executed.

// $ node setTimeout.js 
// Hello World
// multiplication is: 22637556228
// call me ASAP