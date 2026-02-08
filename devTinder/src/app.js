// 0 Import express
const express = require("express");
// 1 creating an instance of express
const app = express();

//  3 default route for our server - whatever request we get we will send back "Hello World from express server"
// app.use(
//   (req, res) => {
//     res.send("Hello World from express server");
//   }, // Request handler function (req,res)
// );

// 4 - in app.use if we want to handle only specific routes we can specify that as well
// with this route in place the default route will not work because the request will be handled by this route and it will not go to the default route
app.use("/home", (req, res) => {
  res.send("Hello world from Home Route people");
});

// 5 - main route
app.use("/", (req, res) => {
  res.send("Hello from Abhishek's server");
});

// 2 now this server needs to listen to a port
app.listen(3000, () => {
  console.log(
    "Server is running on port 3000 : callback function called () => {}",
  );
});
