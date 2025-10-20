# ⚙️ Episode 05: How `require` Works Internally

This episode goes "under the hood" to explore how the Node.js module system, particularly the `require` function, works behind the scenes. Understanding this is key to moving from an average developer to an expert who knows _why_ and _how_ their code works.

## The Magic of Module Privacy: The IIFE Wrapper

When you call `require('./myModule.js')`, Node.js does not simply run the file. Instead, it performs a clever trick to ensure that every module's code remains private and doesn't leak into the global scope.

1. **It wraps the entire code** from your module file inside a special function.
2. This function is an **IIFE (Immediately Invoked Function Expression)**.

An IIFE is a function that is defined and executed at the same time.

```javascript
(function () {
  // All the code from your module (e.g., myModule.js) goes in here.
  // This creates a private scope.
})();
```

This is the reason why variables and functions inside one module are not accessible to another unless you explicitly export them. The IIFE creates a private "bubble" around the module's code.

But how do `module`, `exports`, `require`, `__filename`, and `__dirname` become available inside our module? Node.js doesn't just use a simple IIFE; it uses a wrapper function that passes them in as arguments:

```javascript
(function (exports, require, module, __filename, __dirname) {
  // Your module's code is placed here by Node.js
  const myVariable = "secret";
  const myFunc = () => console.log("hello");
  module.exports = myFunc;
})();
```

### The `require` Function's 5-Step Process

When you call `require()`, Node.js follows a five-step mechanism. This entire process is handled internally by the CJS module loader, which can be found in the `node/lib/internal/modules/cjs/loader.js` file in the Node.js source code.

1. **Resolving**: Node.js finds the absolute path of the module. It can be a core module (`'fs'`), a file (`'./utils.js'`), or a `node_modules` package.
2. **Loading**: Node.js reads the content of the file into memory.
3. **Wrapping**: The loaded code is wrapped inside the IIFE as explained above, providing the private scope and access to helpers like `module` and `exports`.
4. **Evaluation**: The V8 engine executes the wrapped code. During this step, the `module.exports` object is populated with whatever the module chooses to export.
5. **Caching**: **This is a very important optimization.** The first time a module is required, it is loaded and executed. The result (the `module.exports` object) is then **cached**. Any subsequent `require()` call for the same module will skip the first four steps and return the cached result instantly.

### Exploring the Node.js Source Code

Curiosity is what separates a good developer from a great one. You can explore the Node.js codebase yourself to see how it's built.

- **GitHub Repo:** [github.com/nodejs/node](https://github.com/nodejs/node)
- **Key Directories:**
  - `lib/`: Contains the JavaScript part of the Node.js API. This is where you'll find the module loader code.
  - `deps/`: Contains all the C/C++ dependencies that Node.js is built upon. The two most important are:
    - `v8/`: Google's V8 JavaScript engine, which executes the JS code.
    - `uv/`: The **`libuv` library**, a true superpower of Node.js. It's a C library that handles all the asynchronous operations, the event loop, multi-threading, and other low-level tasks that make Node.js so performant.
