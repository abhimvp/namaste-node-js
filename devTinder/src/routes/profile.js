// Manages the profile related routes using express router

const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();

// profile API
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; // we can access the user information from the req object, which is set by the userAuth middleware
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = {
  profileRouter,
};
