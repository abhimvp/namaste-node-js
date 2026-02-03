# Episode-07 | Sync, Async, setTimeout & Event Loop - Code

## Overview

Understand the differences between synchronous and asynchronous code in NodeJS, blocking and non-blocking operations, and how the event loop manages code execution.

---

## Key Learnings

### 1. **Synchronous Code (sync.js)**

- **Definition**: Code executes line by line in a blocking manner.
- **Behavior**: The program waits for each operation to complete before moving to the next line.
- **Example**: Simple variable assignments, function calls, and console.log statements execute immediately in order.
- **Use Case**: Suitable for simple, quick operations where blocking is not a concern.

---

### 2. **Asynchronous Code (async.js)**

- **Definition**: Operations are offloaded to the libuv thread pool and don't block the main thread.
- **Methods in async programming**:
  - `fs.readFile()` - Asynchronously reads files (offloaded to libuv thread pool)
  - `https.get()` - Makes HTTP requests asynchronously
  - Callbacks - Functions executed when async operations complete

- **Important**: Always consume the response stream from `https.get()` using `res.resume()` or by handling data events. This prevents the event loop from hanging and allows the process to exit properly.

- **Execution Order**: Async operations run concurrently with synchronous code. The callback is executed once the operation completes and the call stack is empty.

---

### 3. **Blocking Operations (blocking.js)**

- **Synchronous Blocking Functions**:
  - `crypto.pbkdf2Sync()` - Blocks the main thread until cryptographic key derivation completes
  - `fs.readFileSync()` - Blocks the main thread until the file is read

- **Impact**: Blocking operations prevent other code from executing while they complete. This can cause:
  - Unresponsive applications
  - Poor user experience
  - Bottlenecks in server applications handling multiple requests

- **Best Practice**: **Avoid sync functions in production code** (except for startup scripts or config file reading). Use async alternatives instead.

- **Example**: `crypto.pbkdf2Sync()` with high iteration counts (500,000) can block the main thread for 500ms to 1+ second, preventing other code from executing.

---

### 4. **setTimeout & Event Loop (setTimeout.js)**

- **setTimeout Behavior**:
  - Even with `setTimeout(() => {}, 0)`, the callback doesn't execute immediately.
  - Callbacks are placed in the **timer queue** and processed only after the **call stack is empty**.

- **Execution Order**:
  1. Synchronous code executes first (console.log, function calls)
  2. The call stack becomes empty
  3. The event loop processes the timer queue
  4. setTimeout callback executes

- **Key Insight**: `setTimeout(..., 0)` is useful for deferring code execution, allowing the current execution context to complete before the callback runs.

---

### 5. **JavaScript Engine & Threading**

- **Single-Threaded**: The V8 JavaScript engine is single-threaded and executes on a single call stack.
- **libuv Thread Pool**: Asynchronous operations (file I/O, network requests, cryptography) are offloaded to the libuv thread pool, which is separate from the main thread.
- **Non-Blocking**: Async functions allow the main thread to continue processing other code while I/O operations happen in the background.

---

### 6. **Event Loop Execution Order** (Priority)

1. **Synchronous code** - executes immediately on the call stack
2. **Microtasks** - Promises, process.nextTick()
3. **Macrotasks/Timer Queue** - setTimeout, setInterval
4. **I/O operations** - file reads, HTTP requests (libuv thread pool)
5. **Process waits** - for all pending operations to complete before exiting

- **Note**: If any async operation (like `https.get()`) has an open connection or stream not consumed, Node.js keeps the event loop alive waiting for it to complete.

---

### 7. **Common Issues & Solutions**

| Issue                                  | Cause                           | Solution                                        |
| -------------------------------------- | ------------------------------- | ----------------------------------------------- |
| Program hangs after output             | Unconsumed HTTP response stream | Use `res.resume()` or handle data events        |
| setTimeout doesn't execute immediately | Call stack not empty            | Wait for synchronous code to complete first     |
| Application becomes unresponsive       | Sync blocking operations        | Use async alternatives (pbkdf2, readFile, etc.) |
| setTimeoutZero still waits             | Callback in timer queue         | Event loop processes after call stack is empty  |

---

## Files in This Episode

- **sync.js** - Synchronous code execution
- **async.js** - Asynchronous operations with fs and https modules
- **blocking.js** - Synchronous blocking operations with crypto module
- **setTimeout.js** - Understanding setTimeout and the event loop
- **file.txt** - Sample file for file I/O operations
