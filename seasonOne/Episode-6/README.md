# Node.js Architecture: Understanding libuv & Asynchronous I/O

This repository contains notes and architectural breakdowns of how Node.js handles non-blocking I/O, the role of the V8 engine, and the power of the libuv library.

---

## 🚀 Overview

Node.js is an **event-driven architecture** capable of **Asynchronous I/O**. While JavaScript is a synchronous, single-threaded language, Node.js leverages low-level libraries to perform complex tasks in the background without blocking the main execution thread.

## 🏗️ The Core Components

| Component            | Responsibility                                                                    | Written In |
| :------------------- | :-------------------------------------------------------------------------------- | :--------- |
| **V8 Engine**        | Parses and executes JavaScript. Manages the Call Stack and Memory Heap.           | C++        |
| **libuv**            | A multi-platform library that handles the Event Loop, Thread Pool, and Async I/O. | C          |
| **Operating System** | Manages low-level hardware tasks (Files, Network, Timers).                        | N/A        |

---

## 🔄 The Execution Lifecycle

When an asynchronous task (like a file read or an API call) is detected, Node.js does not wait for it to finish. Instead, it offloads the work.

1. **JS Engine (V8)**: Executes the code line-by-line. When it hits an async function (e.g., `fs.readFile`), it sends it to **libuv**.
2. **libuv**: Takes the task and talks to the **OS**. It "registers" the callback and waits for the OS to signal completion.
3. **The OS**: Processes the request (accessing the disk or network) and returns the data to libuv.
4. **Callback Queue**: libuv places the completed task's callback into this queue.
5. **Event Loop**: Once the **Call Stack** is empty, the Event Loop pushes the callback from the queue into the stack for final execution.

---

## 🧠 Key Technical Concepts

### 1. Synchronous vs. Asynchronous

- **Synchronous (Blocking):** Tasks are executed one by one ($A \rightarrow B \rightarrow C$). If "B" is a slow database query, "C" must wait.
- **Asynchronous (Non-Blocking):** Node.js offloads "B" to libuv. The engine moves immediately to "C." When "B" is ready, its result is handled later.

### 2. Threading in Node.js

- **Is it single-threaded?** Yes and No. The **JavaScript execution** is single-threaded (one Call Stack).
- **The "Secret" Multi-threading:** **libuv** maintains a **Thread Pool** (usually 4 threads). For tasks the OS can't handle asynchronously on its own (like certain File I/O), libuv uses these background threads to prevent blocking the main JS thread.

### 3. Why C/C++?

JavaScript is a high-level language. To interact with the hardware and the OS efficiently, Node.js uses **libuv** (C) and **V8** (C++) because low-level languages are "Genie Beasts" that can talk directly to the System Kernel.

---

## 📝 Summary Notes

- **V8 Engine:** Only job is to execute whatever code you give it, quickly.
- **libuv:** The bridge between V8 and the Operating System.
- **Node.js Principle:** "Time, Tide, and JavaScript wait for none." Never block the stack!

---

_Notes based on Episode 6 - libuv & Async I/O study sessions._
