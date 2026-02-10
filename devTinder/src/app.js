const express = require("express");
const connectDB = require("./config/database"); // to connect to the DB
const app = express();
const User = require("./models/user"); // to perform CRUD operations on the users collection in the DB

app.use(express.json()); // to parse the incoming request body as JSON, this will allow us to access the data sent by the client in the request body using req.body in our route handlers
// this will be activated  for all the routes defined after this line, so we can access the request body in all our route handlers using req.body

// signup route to add a new user to the DB
app.post("/signup", async (req, res) => {
  console.log(req.body); // this will log the request object, which contains all the information about the incoming request, including the request body (req.body) that we will use to get the user data to save in the DB
  const user = new User(req.body); // create a new user document using the User model and the data from the request body (req.body) to save this user in the DB

  try {
    const savedUser = await user.save(); // save the user document to the DB, this will return a promise that resolves to the saved user document
    res.status(201).json(savedUser); // send the saved user document as the response
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error saving user to the DB", details: err });
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  const emailID = req.body.email;
  // use this: https://mongoosejs.com/docs/api/model.html#Model.find()
  try {
    const user = await User.find({ email: emailID });
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching user from the DB", details: err });
  }
});

// Feed API - GET /feed - to get all users from the DB
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); // this will return all the user documents from the DB - empty filter object {} will match all documents in the collection, so it will return all the users in the DB
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching users from the DB", details: err });
  }
});

// Delete API - https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete()
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error deleting user from the DB", details: err });
  }
});

// Update API - https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const updateData = req.body.updateData; // this will contain the fields to be updated and their new values, for example: { name: "New Name", age: 30 }
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      returnDocument: "after",
    }); // this will find the user by ID and update it with the new data, the { new: true } option will return the updated document instead of the original document
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error updating user in the DB", details: err });
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
