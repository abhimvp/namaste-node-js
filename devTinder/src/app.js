// 0 Import express
const express = require("express");
// 1 creating an instance of express
const app = express();
// Remove X-Powered-By header
app.disable("x-powered-by");
//  3 default route for our server - whatever request we get we will send back "Hello World from express server"
// app.use(
//   (req, res) => {
//     res.send("Hello World from express server");
//   }, // Request handler function (req,res)
// );

// app.use("/user", (req, res) => {
//   res.send("Hello from user route");
// }); // this route will ovveride the below get, post and delete routes because it will match the request and it will not go to the below routes
// // order matter in express.

// app.get("/user", (req, res) => {
//   res.send({ firstName: "Abhishek", lastName: "Sharma" });
// });

// app.post("/user", (req, res) => {
//   // res.send({"firstName":"Abhishek","lastName":"Sharma"});
//   console.log("User created successfully - console.log in post request");
//   res.send("User created successfully - response from post request");
// });

// app.delete("/user", (req, res) => {
//   // res.send({"firstName":"Abhishek","lastName":"Sharma"});
//   console.log("User deleted successfully - console.log in delete request");
//   res.send("User deleted successfully - response from delete request");
// });

// app.use("/home/2", (req, res) => {
//   res.send("Hello world from Home Route people - 2");
// });

// 4 - in app.use if we want to handle only specific routes we can specify that as well
// with this route in place the default route will not work because the request will be handled by this route and it will not go to the default route
// app.use("/home", (req, res) => {
//   res.send("Hello world from Home Route people");
// });

// app.use("/home/3", (req, res) => { /// this route is matched to /home
//   res.send("Hello world from Home Route people - 3");
// });

// 5 - main route - the sequence of routes matter in express - if we have a route that matches the request it will be handled by that route and it will not go to the default route
// app.use("/", (req, res) => {
//   res.send("Hello from Abhishek's server");
// });

// need to know - using regex for optional character
// ? means that the preceding character is optional
// so in this case b is optional and the route will match both /ac and /abc
// app.get(/ab?c/, (req, res) => {
//   res.send("Hello from ABC route where b is optional");
// });

// the below route will match /abc, /abbc, /abbbc and so on because + means that the preceding character is one or more times
// app.get(/ab+c/, (req, res) => {
//   res.send("Hello from ABC route where b is one or more times using + regex");
// });

// the below route will match /abcd, /abccd, /abbbcd and so on because * means that the preceding character is zero or more times
// app.get(/ab*cd/, (req, res) => {
//   res.send("Hello from AB*CD route where b is zero or more times using * regex");
// });

// bc is optional in the below route and it will match /ad, /abcd, /abccd and so on because (bc)? means that bc is optional
// app.get(/a(bc)?d/, (req, res) => {
//   res.send("Hello from A(BC)?D route where BC is optional using ? regex");
// });

// app.get(/.*fly$/, (req, res) => {
//   res.send("Hello from route that ends with fly");
// }); // this route will match any route that ends with fly like /butterfly, /dragonfly and so on because .* means any character zero or more times and $ means end of the string

// app.get("/user", (req, res) => {
//   console.log(req.query);
// this req.query will give us the query parameters that we send in the request like /user?name=abhishek&age=25 will give us { name: 'abhishek', age: '25' }
//   res.send({ firstName: "Abhishek", lastName: "Sharma" });
// });

app.get("/user/:userId", (req, res) => {
  // colon (:) means dynamic parameter - it will match any value in that position and it will be available in req.params
  console.log(req.params);
  console.log(req.params.userId);
  // this req.params will give us the route parameters that we send in the request like /user/123 will give us { userId: '123' }
  res.send({ firstName: "Abhishek", lastName: "Sharma" });
});

app.get("/home/:userId/book/:bookId", (req, res) => {
  console.log(req.params);
  console.log(JSON.stringify(req.params));
  // this req.params will give us the route parameters that we send in the request like /home/123/book/456 will give us { userId: '123', bookId: '456' }
  res.send({ firstName: "Abhishek", lastName: "Sharma" });
});

// 2 now this server needs to listen to a port
app.listen(3000, () => {
  console.log(
    "Server is running on port 3000 : callback function called () => {}",
  );
});
