// Manage the routes specific to authentication/authorization (login, logout, register, etc.) using Express Router, and we can export this router to be used in the main app.js file, this way we can keep our code organized and modular, and we can easily manage all the authentication related routes in one place without cluttering the main app.js file with too many routes and logic.
const express = require("express");

const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();
const User = require("../models/user");

// signup API
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// login API
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    // schemaMethods
    const isPasswordValid = await user.validatePassword(password); // we can call the validatePassword method on the user instance to check if the password input by the user is correct or not, and this will return a boolean value, true if the password is correct, and false if the password is incorrect

    if (isPasswordValid) {
      const token = await user.getJWT(); // offloaded the logic of generating JWT token to the user model, and we can call that method on the user instance to get the token
      // code looks cleaner and more organized, and we can reuse the getJWT method in other parts of the code if we need to generate a token for the user
      // using schema methods is a good way to keep our code organized and maintainable, and it also allows us to add custom functionality to our models without cluttering our route handlers or other parts of the codebase with that logic

      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000), // cookie will be removed after 1 hour
      });

      res.send("Login successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// logout API
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token"); // to logout the user, we can simply clear the token cookie from the browser, and this will effectively log the user out of the application, and we can send a response back to the client indicating that the logout was successful - https://expressjs.com/en/5x/api.html#res.clearCookie
  //   or
  //   res.cookie("token", null, { expires: new Date(Date.now()) }); // we can also set the token cookie to null and set its expiration time to the current time, this will also effectively log the user out of the application, and we can send a response back to the client indicating that the logout was successful
  res.send("Logout successful");
});

module.exports = {
  authRouter,
};
