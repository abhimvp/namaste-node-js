const express = require("express");
var cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

var corsOptions = {
  origin: "http://localhost:5173", // backend should know frontend origin and whitelist the http kind of urls coming from the frontend for the axios to be able to store the cookie in the browser, and send the cookie back to the backend in subsequent requests, and this is a security measure to prevent cross-site request forgery (CSRF) attacks, and also to allow the frontend to access the resources on the backend without any issues, and we can also specify other options like allowed methods, allowed headers, etc. if needed
  credentials: true, // to allow the frontend to send cookies in the requests to the backend, and this is also a security measure to prevent cross-site request forgery (CSRF) attacks, and also to allow the frontend to access the resources on the backend without any issues, and we can also specify other options like allowed methods, allowed headers, etc. if needed
};

// https://expressjs.com/en/resources/middleware/cors.html
// Adds headers: Access-Control-Allow-Origin: *
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/requests");
const { userRouter } = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to the DB", err);
  });
