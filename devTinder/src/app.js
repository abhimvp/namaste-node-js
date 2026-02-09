const express = require("express");
const connectDB = require("./config/database"); // to connect to the DB
const app = express();
const User = require("./models/user"); // to perform CRUD operations on the users collection in the DB

// signup route to add a new user to the DB
app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Rajamouli",
    lastName: "Varanasi",
    email: "maheshbabu@gmail.com",
    password: "jaibabu",
    age: 37,
    gender: "Male",
  };
  const user = new User(userObj); // create a new user document(instance) using the User model and the userObj to save this user in the DB

  try {
    const savedUser = await user.save(); // save the user document to the DB, this will return a promise that resolves to the saved user document
    res.status(201).json(savedUser); // send the saved user document as the response
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error saving user to the DB", details: err });
  }
});

// call the function to connect to the DB & then start the server if the connection is successful, otherwise log the error
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
