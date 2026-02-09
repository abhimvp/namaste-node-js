// 0 Import express
const express = require("express");
// 1 creating an instance of express
const app = express();
// import adminAuth from "./middleware/adminAuth.js"; // this is how we can import a middleware function from another file, we can also write the middleware function in the same file, but it's better to keep the middleware functions in a separate file for better organization and maintainability of the code.
// const { adminAuth, userAuth } = require("./middlewares/auth.js");

// why do we need middleware?
// middleware is a function that has access to the request and response objects, and the next function in the application's request-response cycle. It can execute any code, make changes to the request and response objects, end the request-response cycle, or call the next middleware function in the stack.
// we can use middleware to perform tasks such as logging, authentication, error handling, etc. before sending the response back to the client.
// example
// if we have to write auth logic - checking token for all requests? - this is where middleware comes in handy, we can write the auth logic in a middleware function and use it for all routes that require authentication, instead of writing the same auth logic in each route handler, which will lead to code duplication and maintenance issues.
// middleware are written using app.use() methos
// this will handle all /admin routes to handle auth for all GET , POST, PUT, DELETE requests for /admin routes, we can also use app.get(), app.post(), app.put(), app.delete() methods to handle specific HTTP method requests for /admin routes, but using app.use() is more efficient and cleaner way to handle all /admin routes in one place, instead of writing separate route handlers for each HTTP method for /admin routes.
// app.use("/admin", adminAuth);
// console.log("Admin Auth is getting checked first");
// const token = "xyz";
// const isAuthenticated = token === "xyz"; // this is just a dummy authentication logic, in real world we will have more complex logic to check if the user is authenticated or not, such as checking the token in the database, checking the expiration time of the token, etc.
// if (!isAuthenticated) {
//   res.status(401).send("Unauthorized"); // if the user is not authenticated, send a response back to the client with an error message and status code 401 (Unauthorized)
// } else {
//   next(); // if the user is authenticated, call the next middleware function to get the data from the database and send it back to the client
// }
// });
// app.use("/user", userAuth); // we can do this for user routes
// app.get("/user/abhi", userAuth, (req, res) => {
// we can do this too for auth - by adding middleware function we can customize the auth logic for each route, for example we can have different auth logic for user routes and admin routes, we can also have different auth logic for different user roles, such as admin, user, guest, etc. by adding the middleware function in the route handler, we can ensure that the auth logic is executed before the route handler is executed, so if the user is not authenticated, the route handler will not be executed and a response will be sent back to the client with an error message and status code 401 (Unauthorized), if the user is authenticated, then the route handler will be executed and a response will be sent back to the client with the data from the database or any other response that we want to send back to the client.
//   console.log("This is the route handler for /user");
//   res.send("Hello from the user route abhi");
// }); // this will not trigger above midddleware because the path is /user and not /admin, so the request will not go through the middleware function defined for /admin routes, it will directly go to the route handler for /user route and send the response back to the client.
// app.get("/admin/getAllData", (req, res) => {
//   console.log("This is the route handler for /admin/getAllData");
// check if the request is authenticated, if not send a response back to the client with an error message, if yes then call the next middleware function to get the data from the database and send it back to the client

//   res.send("Hello from the getAllData route");
// });

// app.get("/admin/deleteAllData", (req, res) => {
//   console.log("This is the route handler for /admin/deleteAllData");
//   res.send("Hello from the admin delete route");
// });

// error handling - what if the DB goes down or some other middleware function throws an error, we can use error handling middleware to handle such errors and send a response back to the client with an error message and status code 500 (Internal Server Error), this will prevent the server from crashing and also provide a better user experience by sending a proper error message back to the client instead of just crashing the server.
app.get("/getUserData", (req, res) => {
  // logic of DB call and get user data
  throw new Error("DB is down"); // this will throw an error and the error handling middleware will catch this error and send a response back to the client with an error message and status code 500 (Internal Server Error)
  res.send("User Data Sent");
});
// whenever we do code - we need to write all the code inside try catch block to catch any error that might occur in the code and handle it properly, but this will lead to a lot of code duplication and maintenance issues, so instead of writing try catch block in each route handler, we can use error handling middleware to handle all the errors in one place, this will make our code cleaner and more maintainable.

// if there is any unhandled error in the code, it will be caught by this error handling middleware and a response will be sent back to the client with an error message and status code 500 (Internal Server Error)
app.use("/", (err, req, res, next) => {
  // this is also a middleware function, but it has an extra parameter err which is used to catch any error that might occur in the code, this middleware function will be called whenever there is an unhandled error in the code, and the error will be passed as an argument to this middleware function, so we can log the error and send a response back to the client with an error message and status code 500 (Internal Server Error) to indicate that something went wrong on the server side.
  console.error(err);
  if (err) {
    // log the error and send some alerts here
    res.status(500).send("Something went wrong, please try again later");
  }
});

// instead we can write try-catch block
app.get("/getUserDataWithTryCatch", (req, res) => {
  try {
    // logic of DB call and get user data
    throw new Error("DB is down"); // this will throw an error and the catch block will catch this error and send a response back to the client with an error message and status code 500 (Internal Server Error)
    res.send("User Data Sent");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        "Something went wrong, please try again later - getUserDataWithTryCatch",
      );
  }
});

// app.use("/user", (req, res) => {
// app.use takes in all http method requests (get, post, put, delete) and the path is /user
//   res.send("Hello from the user route");
// });

// there can be multiple route handlers
// app.use(
//   "/userone",
//   (req, res, next) => {
// next argument is used when we have multiple route handlers for the same path, it allows us to call the next route handler in the stack
//     console.log("This is the first route handler for /userone");
// res.send("Hello from the user route");
//     next(); // this will call the next route handler for the same path /userone
// res.send("Hello from the user route");
//   },
//   (req, res) => {
//     console.log("This is the second route handler for /userone");
//     res.send("Hello from the user route 2"); // if there is res.send in first & second route handler, then the second route handler will not be called
// and throws error "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client" because the socket is already closed after sending the response in the first route handler, so we cannot send another response in the second route handler
// w.r.t to javascript call stack, the first route handler will be called and it will execute until it reaches the next() function, then it will call the second route handler and execute it until it reaches the res.send() function, which will send the response back to the client and close the socket, so if there is another res.send() function in the first route handler after the next() function, it will throw an error because the socket is already closed.
//   },
// );
// we can add as many route handlers as we want for the same path, but we need to make sure that we call the next() function in each route handler to call the next route handler in the stack, otherwise the request will be hanging and eventually time out because we are not sending any response back to the client.

// app.use("/xyz",(req,res) =>{
// not sending any response back to the client, so the request will be hanging and eventually time out
// we do not want to do this, we should always send a response back to the client, even if it's just a simple message or an error message
// });

// app.get("/nextseperateroute", (req, res, next) => {
//   console.log("This is the route handler for /nextseperateroute");
//   next(); // this will call the next route handler for the same path /nextseperateroute, which is defined below
// order of route handlers is important,
// });
// app.get("/nextseperateroute", (req, res) => {
//   console.log("This is the second route handler for /nextseperateroute");
//   res.send("Hello from the nextseperateroute route");
// });

// 2 now this server needs to listen to a port
app.listen(3000, () => {
  console.log(
    "Server is running on port 3000 : callback function called () => {}",
  );
});
