# 🚀 Episode 02: JS on the Server

This episode explains the benefits of using JavaScript for server-side development, showcases its non-blocking architecture, and demonstrates how it helps in building fast, scalable web applications.

## Node.js Architecture & The V8 Engine

- **Is Node.js C++?** No, but its core is built upon it. **Node.js is a C++ application that embeds the V8 JavaScript engine within it.**
- **The V8 Engine:**
  - It is Google's open-source, high-performance JavaScript engine, **written in C++**.
  - Its primary job is to take our JavaScript code and convert it into low-level machine code that a computer can execute.
- **The Power of Embedding:** Because V8 is a C++ program, it can be embedded into any C++ application. This is exactly what Node.js does.

### Node.js = V8 + Superpowers

V8 by itself runs in a sandbox and cannot access things outside the browser, like your computer's file system or databases. Node.js extends the functionality of the V8 engine by providing **server-side APIs and modules** (written in C++) that give JavaScript "superpowers."

- **V8 (C++)**: Executes JS code.
- **Node.js APIs (C++)**: Provides access to the file system (`fs`), HTTP requests (`http`), process information (`process`), and more.

This is why frameworks like **MERN** (**M**ongoDB, **E**xpress, **R**eact, **N**ode) are so powerful, allowing developers who know JavaScript to write code for both the **client-side (frontend)** and the **server-side (backend)**.

## ECMAScript (ES) and the TC39 Committee

- **ECMAScript:** This is the **standard** that JavaScript is based on. It defines the rules, syntax, and features of the language (e.g., the `===` operator).
- **TC39:** This is the committee responsible for maintaining and evolving the ECMAScript standard.
- **Why it Matters:** All major JS engines (Google's V8, Mozilla's SpiderMonkey, Microsoft's Chakra) adhere to the ECMAScript standard, ensuring that JavaScript code runs consistently across different environments.

## What is a Server?

- A **server** is essentially a remote computer (a CPU working remotely) located somewhere in the world.
- "Running a website on a server" means your site's code is executing on one of these remote machines, which is responsible for receiving and responding to requests.
- An **IP address** is used to point to a specific device, like a server. The flow is typically:
  - **Client (Browser)** makes a request to a domain (e.g., `google.com`).
  - This domain resolves to an **IP address**.
  - The request is sent to the **Server** at that IP address.
