// Manages the profile related routes using express router

const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();

// profile API - to view the profile of the logged in user, we can access the user information from the req object, which is set by the userAuth middleware, and we can send that information back to the client as a response
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; // we can access the user information from the req object, which is set by the userAuth middleware
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// Edit Profile API
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error(
        "Invalid fields in the request body - Invalid Edit Request",
      );
    }
    const loggedInUser = req.user; // we can access the user information from the req object, which is set by the userAuth middleware
    // console.log("logged in user before update", loggedInUser);
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key])); // we can update the user information by iterating over the keys of the request body and updating the corresponding fields in the loggedInUser object
    // console.log("logged in user after update", loggedInUser);

    await loggedInUser.save(); // we need to save the updated user information to the database, and this will trigger the pre save hook in the user model, which will update the updatedAt field with the current date and time
    // res.send(`Profile updated successfully for ${loggedInUser.firstName}`); or
    res.json({
      message: `Profile updated successfully for ${loggedInUser.firstName}`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = {
  profileRouter,
};
