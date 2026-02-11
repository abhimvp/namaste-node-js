const express = require("express");
const connectDB = require("./config/database"); // to connect to the DB
const app = express();
const User = require("./models/user"); // to perform CRUD operations on the users collection in the DB
const { validateSignupData } = require("./utils/validation"); // to validate the signup data before saving it to the DB
const bcrypt = require("bcrypt"); // to encrypt the password before saving it to the DB
const cookieParser = require("cookie-parser"); // to parse the cookies from the incoming request
const jwt = require("jsonwebtoken"); // to create and verify JWT tokens for authentication and authorization

app.use(express.json()); // to parse the incoming request body as JSON, this will allow us to access the data sent by the client in the request body using req.body in our route handlers
// this will be activated  for all the routes defined after this line, so we can access the request body in all our route handlers using req.body

app.use(cookieParser()); // to parse the cookies from the incoming request - this is a middleware that will be executed for all the routes defined after this line, so we can access the cookies in all our route handlers using req.cookies

// signup route to add a new user to the DB
app.post("/signup", async (req, res) => {
  try {
    // 1 validating the data

    validateSignupData(req); // this will validate the signup data using the validateSignupData function defined in the utils/validation.js file, if the data is invalid, it will throw an error and the execution will stop here, otherwise it will continue to the next step

    const { firstName, lastName, email, password } = req.body;

    // 2 Encrypting the password
    const passwordHash = await bcrypt.hash(password, 10); // this will hash the password using bcrypt with a salt rounds of 10, which means that it will add 10 random characters to the password before hashing it, this will make the hashed password more secure and harder to crack
    // console.log("Hashed password: ", passwordHash);

    // save the user in the DB
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash, // we will save the hashed password in the DB instead of the plain text password, so that even if someone gets access to the DB, they won't be able to see the actual passwords of the users
    });
    const savedUser = await user.save(); // save the user document to the DB, this will return a promise that resolves to the saved user document
    res.status(201).json(savedUser); // send the saved user document as the response
  } catch (err) {
    res.status(400).send("ERROR: " + err.message); // if there is any error during the validation or saving process, we will catch it here and send a response with status code 400 (Bad Request) and the error message
  }
});

// login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // first check whether the user with emailid is present in db or not

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
      // never send a response with status code 404 (Not Found) for invalid credentials, because it will give a hint to the attacker that the email ID is not registered in our system, which can be used for further attacks, so we will just send a generic error message without specifying whether the email ID is invalid or the password is invalid
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await jwt.sign(
        { _id: user._id },
        "secretKeyIKNowThisIsNotASafeWayToStoreTheSecretKeyInProduction",
      ); // this will create a JWT token with the user ID as the payload, and a secret key to sign the token, but it's generally recommended to keep it short for better security
      // console.log("Generated JWT Token: ", token);

      // Add the token to cookie and send the response back to the user.
      res.cookie("token", token);

      res.send("Login successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    // now we validate the cookie
    const cookies = req.cookies;
    const { token } = cookies;
    // console.log("Received token from cookie: ", token);
    if (!token) {
      throw new Error(
        "No token found in cookies, please login to access the profile page",
      );
    }
    // validate my token here, if the token is valid, then we will allow the user to access the profile page, otherwise we will send an error response with status code 401 (Unauthorized) and a message "Invalid Token"
    const decodedMessage = await jwt.verify(
      token,
      "secretKeyIKNowThisIsNotASafeWayToStoreTheSecretKeyInProduction",
    ); // this will verify the token using the same secret key that was used to sign the token, if the token is valid, it will return the decoded payload (which contains the user ID in our case), otherwise it will throw an error
    // console.log("Decoded message from token: ", decodedMessage);
    const { _id } = decodedMessage; // this will extract the user ID from the decoded message, which we can use to fetch the user details from the DB and send it as a response to the client
    // console.log("logged in user id is : ", _id);

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
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
      .json({ error: "Error fetching user from the DB", details: err.message });
  }
});

// Feed API - GET /feed - to get all users from the DB
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); // this will return all the user documents from the DB - empty filter object {} will match all documents in the collection, so it will return all the users in the DB
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      error: "Error fetching users from the DB",
      details: err.message,
    });
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
      .json({ error: "Error deleting user from the DB", details: err.message });
  }
});

// Update API - https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const updateData = req.body.updateData; // this will contain the fields to be updated and their new values, for example: { name: "New Name", age: 30 }

  try {
    const ALLOWED_UPDATE_FIELDS = [
      // api level updates
      "password",
      "age",
      "about",
      "photoUrl",
      "skills",
    ]; // this will define the fields that are allowed to be updated, so that we can prevent updating any field that is not allowed to be updated, for example: we don't want to allow updating the _id field or the createdAt field

    const isUpdateAllowed = Object.keys(updateData).every((field) =>
      ALLOWED_UPDATE_FIELDS.includes(field),
    ); // this will check if all the fields in the updateData object are allowed to be updated, if there is any field that is not allowed to be updated, then this will return false
    if (!isUpdateAllowed) {
      return res.status(400).json({ error: "Invalid update fields" });
    }

    if (updateData?.skills?.length > 10) {
      throw new Error("You can add up to 10 skills only");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      returnDocument: "after",
      runValidators: true, // this will run the validators defined in the user schema before updating the document in the DB, so that we can ensure that the updated data is valid according to our schema definition
    }); // this will find the user by ID and update it with the new data, the { new: true } option will return the updated document instead of the original document
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error updating user in the DB", details: err.message });
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
