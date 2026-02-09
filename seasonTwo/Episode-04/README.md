# Episode - 04 | Routing & Request Handlers

- Learn how to handle HTTP requests and route them effectively in this episode.
- We explore Express routing, how to create dynamic routes, and set up request handlers that serve data to your users.
- By the end of this video, you’ll know how to design routes that manage traffic flow and serve content efficiently, laying the groundwork for a structured backend.

<!-- reference notes of akshadjaiswal -->

## Project Overview

DevTinder is a MERN application for developers to connect and collaborate. This repository contains the backend code for the project.

## Repository Link

- [DevTinder Backend Repository](https://github.com/akshadjaiswal/devTinder-backend)

## HTTP Methods

### 1. POST

- Used to create a new resource
- Request body contains the data to be created
- Example: Creating a new user account

### 2. GET

- Used to retrieve a resource
- Request query parameters can be used to filter or sort data
- Example: Retrieving a list of users

### 3. PATCH

- Used to partially update a resource
- Request body contains the changes to be made
- Example: Updating a user's profile information

### 4. DELETE

- Used to delete a resource
- Example: Deleting a user account

### 5. PUT

- Used to replace a resource entirely
- Request body contains the new data
- Example: Updating a user's entire profile information

## Notes

- HTTP methods can be used to perform CRUD (Create, Read, Update, Delete) operations on resources
- Understanding the differences between these methods is crucial for building a robust and scalable backend

## API Testing with Postman

### What is Postman?

- Postman is a popular API testing tool that allows you to send HTTP requests and view responses in a user-friendly interface.

### Why use Postman?

- Postman provides an easy way to test and debug APIs, making it an essential tool for backend development.

### How to use Postman?

- Download and install Postman from the official website
- Create a new request by selecting the HTTP method (e.g., GET, POST, PUT, DELETE) and entering the API endpoint URL
- Add request headers, query parameters, and body data as needed
- Send the request and view the response in the Postman interface

# Advanced Routing in Node.js

## Overview

Routing in Node.js allows you to define how the server responds to various HTTP requests. Advanced routing techniques can be used to create dynamic and flexible routes by using special characters like `+`, `?`, `*`, and regular expressions.

## Special Characters in Routing

### 1. `+` (Plus)

- The `+` character matches one or more occurrences of the preceding character.
- Example:
  ```
  app.get('/ab+c', (req, res) => {
    res.send('Route matched: /ab+c');
  });
  ```

#### The route /ab+c would match:

- /abc
- /abbc
- /abbbc, and so on.

### `?` (Question Mark)

- The `?` character makes the preceding character optional in an Express route pattern.
- Example:

```
app.get('/ab?c', (req, res) => {
  res.send('Route matched: /ab?c');
});
```

#### This route will match:

- /abc
- /ac (since b is optional).

### `*` (Asterisk)

- The `*` character matches any sequence of characters in an Express route.
- Example:

```
app.get('/a*cd', (req, res) => {
  res.send('Route matched: /a*cd');
});
```

#### This route will match:

- /acd
- /abcd
- /axyzcd, etc.

### Regular Expressions

- Regular expressions (regex) can be used in Express routing to match complex patterns.
- Examples:

```
app.get(/a/, (req, res) => {
  res.send('Route matched any path containing "a"');
});
```

#### This route will match:

- /abc
- /a123
- /123a, etc.

## String Routes vs Regex Routes

### Key Differences

In Express routing, there are two different ways to define routes, and they have different syntax:

**String Route (with double/single quotes):**

```javascript
app.get("/home", (req, res) => { ... });  // String literal
app.get("/ab(c)?", (req, res) => { ... }); // Optional group syntax
```

**Regex Route (with forward slashes, NO quotes):**

```javascript
app.get(/ab?c/, (req, res) => { ... });   // RegExp literal
app.get(/a(bc)?d/, (req, res) => { ... }); // Regex pattern
```

### Why Different Syntax?

In JavaScript, these are different **data types**:

- `"/home"` = String data type
- `/ab?c/` = RegExp (Regular Expression) data type

### Usage Comparison

| Type                  | Syntax            | Use Case          | Example                        |
| --------------------- | ----------------- | ----------------- | ------------------------------ |
| **String (simple)**   | `"/users"`        | Exact paths       | `app.get("/users", ...)`       |
| **String (dynamic)**  | `"/users/:id"`    | Path parameters   | `app.get("/users/:id", ...)`   |
| **String (optional)** | `"/users(/:id)?"` | Optional segments | Group with parentheses         |
| **Regex**             | `/\/users\/\d+/`  | Complex patterns  | Only numeric IDs: `/users/123` |
| **Regex**             | `/^\/admin/`      | Start pattern     | Starts with `/admin`           |
| **Regex**             | `/\.json$/`       | End pattern       | Ends with `.json`              |

### Practical Examples

```javascript
// String routes
app.get("/users", ...);           // Exact match: /users
app.get("/users/:id", ...);       // Dynamic param: /users/123
app.get("/a*c", ...);             // Wildcard: /abc, /axyzc

// Regex routes
app.get(/ab?c/, ...);             // Optional b: /ac, /abc
app.get(/ab+c/, ...);             // One+ b: /abc, /abbc, /abbbc
app.get(/ab*cd/, ...);            // Zero+ b: /acd, /abcd, /abbbcd
app.get(/a(bc)?d/, ...);          // Optional bc: /ad, /abcd
app.get(/\/users\/\d+/, ...);     // Numeric ID: /users/123
app.get(/^\/admin/, ...);         // Starts with: /admin*
```

### Best Practice

- Use **string routes for simple paths** - they're more readable
- Use **regex routes only for complex pattern matching** - when string syntax won't work

## Finding Documentation in Express.js

### Official Express.js Documentation Resources

**Main Routing Guide:**

- Visit: `https://expressjs.com/en/guide/routing.html`
- This is the primary source for all routing patterns and examples

**API Reference:**

- Visit: `https://expressjs.com/en/5x/api.html`
- More technical details and method signatures

### What to Search For

When looking for routing information in the Express documentation, use these keywords:

1. **"Route Paths"** - Explains string paths, parameters, and special characters
2. **"Regular expressions"** - Details about regex route syntax
3. **"app.METHOD()"** - Like app.get(), app.post(), etc.
4. **"Routing"** - General routing concepts and best practices

### Documentation Structure

The Express routing documentation covers:

- ✅ String-based paths: `/users`, `/users/:id`
- ✅ Special characters in paths: `+`, `?`, `*`, `()`
- ✅ Regular expression routes: `/ab?c/`, `/^\/admin/`
- ✅ Route handlers and middleware
- ✅ Multiple handlers and next()

### Verifying Features in Your Version

To check your current Express version:

```bash
npm list express
```

Features like advanced regex routing have been core to Express since early versions, so they're available in all modern versions including express@^5.2.1 and above.

### Tips for Using the Documentation

1. **Bookmark the routing page** - You'll reference it frequently
2. **Pay attention to examples** - Real-world code patterns are shown
3. **Check the API reference** - For method signatures and parameters
4. **Look for notes sections** - Important edge cases and limitations are documented
5. **Test in Postman** - Always verify your routes work as expected

## Route Order Matters in Express.js

### Why Does Route Order Matter?

Express.js evaluates routes **sequentially from top to bottom**. When a request comes in, Express matches it against each route in the order they're defined and **stops at the first match**. This means the order of your routes is critical for correct behavior.

### Example: Order Impact

```javascript
// CORRECT ORDER - Specific routes BEFORE general routes
app.use("/home/2", (req, res) => {
  res.send("Home 2 page");
});

app.use("/home", (req, res) => {
  res.send("General home page");
});

app.use("/", (req, res) => {
  res.send("Root page");
});
```

If you reverse the order:

```javascript
// WRONG ORDER - General routes BEFORE specific routes
app.use("/", (req, res) => {
  res.send("Root page"); // This will match EVERYTHING
});

app.use("/home", (req, res) => {
  res.send("General home page"); // This will NEVER be reached
});

app.use("/home/2", (req, res) => {
  res.send("Home 2 page"); // This will NEVER be reached
});
```

### Best Practice

Always define **more specific routes before general ones**:

1. First: Specific routes (e.g., `/user/profile`, `/user/settings`)
2. Middle: Less specific routes (e.g., `/user`, `/home`)
3. Last: Catch-all routes (e.g., `/`)

### Is This Common in Other Frameworks?

This sequential matching behavior is **common across most frameworks**, but implementation varies:

- **Express.js, Flask, FastAPI**: Sequential route matching (first match wins)
- **Django, Laravel, Rails**: Often prioritize more specific routes automatically through pattern matching
- **ASP.NET, Next.js**: Use file-based or more sophisticated routing systems to reduce this issue

Understanding route ordering is essential for building reliable Express.js applications.

## Notes:

```bash
// response headers in browser
HTTP/1.1 304 Not Modified
X-Powered-By: Express

Client: GET /style.css
        If-None-Match: "abc123"

Server: 304 Not Modified  ← Resource unchanged, use your cache
        (no body sent)
```

`X-Powered-By`: Express
This header reveals that your server is running Express.js.

**Security Concern**: This is a security vulnerability because it:

- Exposes your technology stack to attackers
- Makes it easier for hackers to exploit known Express.js vulnerabilities
- Provides reconnaissance information

```js
const express = require("express");
const app = express();

// Remove X-Powered-By header
app.disable("x-powered-by");

// Or use helmet middleware for better security
const helmet = require("helmet");
app.use(helmet());
```

Why remove it?

- Security through obscurity (don't advertise your stack)
- Reduces attack surface
- Industry best practice
- OWASP recommendation

## Understanding `[Object: null prototype]` in req.params

### What You See in Console

When logging `req.params` in Express, you might see output like:

```javascript
console.log(req.params);
// Output: [Object: null prototype] { userId: '234', bookId: '567' }
```

### Why Does This Happen?

Express creates `req.params` using `Object.create(null)`, which creates an object **without a prototype chain**. The `[Object: null prototype]` prefix is Node.js indicating this object has no prototype.

### Reasons for This Design

Express uses null-prototype objects for `req.params` because of:

1. **Security - Prevents Prototype Pollution Attacks**
   - Malicious users cannot inject dangerous properties like `__proto__`, `constructor`, or `toString`
   - Protects against prototype pollution vulnerabilities
   - No inherited properties that could be exploited

2. **Performance Optimization**
   - Faster property lookups without prototype chain traversal
   - No need to check inherited properties
   - More efficient memory usage

3. **Clean Data Structure**
   - Contains only route parameters, nothing else
   - No inherited methods or properties
   - Predictable and consistent behavior

### This is NOT an Error

Your data is completely accessible and works perfectly:

```javascript
app.get("/user/:userId/book/:bookId", (req, res) => {
  console.log(req.params); // [Object: null prototype] { userId: '234', bookId: '567' }
  console.log(req.params.userId); // '234' ✅
  console.log(req.params.bookId); // '567' ✅

  // All normal operations work fine
  const { userId, bookId } = req.params; // ✅ Works perfectly
  res.send(`User: ${userId}, Book: ${bookId}`); // ✅ Works perfectly
});
```

### If You Want Clean Console Output

Use these alternatives for cleaner logging:

```javascript
// Option 1: JSON.stringify for clean output
console.log(JSON.stringify(req.params));
// Output: {"userId":"234","bookId":"567"}

// Option 2: Spread into new object
console.log({ ...req.params });
// Output: { userId: '234', bookId: '567' }

// Option 3: Access properties directly
console.log(`User: ${req.params.userId}, Book: ${req.params.bookId}`);
// Output: User: 234, Book: 567

// Option 4: Use console.table for multiple params
console.table(req.params);
// Displays a nice table format
```

### Key Takeaways

- ✅ `[Object: null prototype]` is a **security feature**, not an error
- ✅ It prevents prototype pollution attacks
- ✅ Your code works normally - all property access is unaffected
- ✅ The prefix only appears in console output
- ✅ Use JSON.stringify() or spread operator for cleaner logs if needed

### Similarly Affected Objects

Express uses null-prototype objects for:

- `req.params` - Route parameters
- `req.query` - Query string parameters (in some versions)

This is a best practice that prioritizes security and performance over console aesthetics.

## Understanding JSON.stringify()

### What is JSON.stringify()?

`JSON.stringify()` is a built-in JavaScript method that converts JavaScript objects (and other values) into JSON string format. It's essential for debugging, data transfer, and storage.

### Why Use JSON.stringify()?

#### 1. Clean Console Output

**Without JSON.stringify:**

```javascript
console.log(req.params);
// [Object: null prototype] { userId: '234' }
// or
// { name: 'John', age: 25, address: { city: 'NYC' } }
```

**With JSON.stringify:**

```javascript
console.log(JSON.stringify(req.params));
// {"userId":"234"}
// Clean, readable, no prototype information
```

#### 2. See Nested Objects Fully

`console.log()` sometimes truncates or doesn't show deep nested objects:

```javascript
const data = {
  user: {
    profile: {
      settings: { theme: "dark" },
    },
  },
};

console.log(data);
// Might show: { user: { profile: [Object] } }  ❌ Truncated

console.log(JSON.stringify(data));
// {"user":{"profile":{"settings":{"theme":"dark"}}}}  ✅ Full view

console.log(JSON.stringify(data, null, 2));
// {
//   "user": {
//     "profile": {
//       "settings": {
//         "theme": "dark"
//       }
//     }
//   }
// }  ✅ Pretty-printed!
```

#### 3. Save and Send Data

You need JSON strings to:

- **Send data over HTTP** (APIs, fetch requests)
- **Store in databases** or files
- **Save to localStorage** in browsers

```javascript
// Send data to client in Express
res.send(JSON.stringify({ status: "success", data: userData }));

// Save to file using Node.js
const fs = require("fs");
fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

// localStorage (browser environment)
localStorage.setItem("user", JSON.stringify(userData));
```

#### 4. Compare Objects

You can't directly compare objects in JavaScript:

```javascript
{ a: 1 } === { a: 1 }  // false ❌ (different references)

JSON.stringify({ a: 1 }) === JSON.stringify({ a: 1 })  // true ✅
```

### JSON.stringify() Syntax

```javascript
JSON.stringify(value, replacer, space);
```

**Parameters:**

- **value** (required): The data to convert (object, array, string, number, etc.)
- **replacer** (optional): Filter function or array to control what gets included (usually `null`)
- **space** (optional): Number of spaces for indentation (0-10) or string for pretty printing

### Pretty Printing Examples

```javascript
const user = { name: "John", age: 25, city: "NYC" };

// Compact format (one line)
console.log(JSON.stringify(user));
// '{"name":"John","age":25,"city":"NYC"}'

// Pretty format with 2 spaces
console.log(JSON.stringify(user, null, 2));
// '{
//   "name": "John",
//   "age": 25,
//   "city": "NYC"
// }'

// Pretty format with 4 spaces
console.log(JSON.stringify(user, null, 4));
// More indentation for better readability

// Using tab character for indentation
console.log(JSON.stringify(user, null, "\t"));
```

### Practical Express Examples

```javascript
// Example 1: Logging request data
app.get("/user/:id", (req, res) => {
  console.log("Params:", JSON.stringify(req.params));
  console.log("Query:", JSON.stringify(req.query));
  console.log("Headers:", JSON.stringify(req.headers, null, 2));

  res.send({ message: "User data" });
});

// Example 2: Debugging complex objects
app.post("/api/data", (req, res) => {
  const complexData = {
    user: req.body,
    timestamp: new Date(),
    params: req.params,
    query: req.query,
  };

  console.log("Full request context:", JSON.stringify(complexData, null, 2));
  res.json(complexData);
});

// Example 3: Saving to file for debugging
app.get("/debug", (req, res) => {
  const debugInfo = {
    params: req.params,
    query: req.query,
    headers: req.headers,
  };

  fs.writeFileSync("debug.json", JSON.stringify(debugInfo, null, 2));

  res.send("Debug info saved");
});
```

### When NOT to Use JSON.stringify()

Some JavaScript values don't work well with JSON.stringify():

```javascript
const obj = {
  // ✅ These work fine
  string: "hello",
  number: 123,
  boolean: true,
  null: null,
  array: [1, 2, 3],
  nested: { a: 1 },

  // ❌ These don't work or have issues
  func: function () {
    return "test";
  }, // Removed from output
  undef: undefined, // Removed from output
  symbol: Symbol("id"), // Removed from output
  date: new Date(), // Converted to ISO string
  regex: /test/gi, // Becomes empty object {}
};

console.log(JSON.stringify(obj, null, 2));
// Output:
// {
//   "string": "hello",
//   "number": 123,
//   "boolean": true,
//   "null": null,
//   "array": [1, 2, 3],
//   "nested": { "a": 1 },
//   "date": "2026-02-09T12:30:45.123Z",
//   "regex": {}
// }
// Note: func, undef, and symbol are missing!
```

### Handling Circular References

JSON.stringify() will throw an error with circular references:

```javascript
const obj = { name: "John" };
obj.self = obj; // Circular reference

// This will throw: "TypeError: Converting circular structure to JSON"
// JSON.stringify(obj);  ❌

// Solution: Use a custom replacer or library like 'flatted'
const seen = new WeakSet();
const safeStringify = (obj) => {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }
    return value;
  });
};

console.log(safeStringify(obj)); // ✅ Works
```

### Key Takeaways

- ✅ Use `JSON.stringify()` to convert objects to readable JSON strings
- ✅ Add parameters for pretty printing: `JSON.stringify(obj, null, 2)`
- ✅ Essential for HTTP APIs, file storage, and localStorage
- ✅ Great for debugging nested or complex objects
- ✅ Be aware of limitations: functions, undefined, symbols are excluded
- ✅ Dates become ISO strings, not Date objects
- ✅ Watch out for circular references

### Companion: JSON.parse()

To convert JSON strings back to JavaScript objects:

```javascript
const jsonString = '{"name":"John","age":25}';
const obj = JSON.parse(jsonString);

console.log(obj.name); // 'John'
console.log(obj.age); // 25

// Common use case: Reading from localStorage or files
const userData = JSON.parse(localStorage.getItem("user"));
const fileData = JSON.parse(fs.readFileSync("data.json", "utf8"));
```
