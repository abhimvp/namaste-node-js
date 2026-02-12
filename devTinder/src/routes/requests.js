// Manages the connection request related routes using express router

const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();


requestRouter.post("/sendconnectionrequest", userAuth, async (req, res) => {
  const user = req.user; // we can access the user information from the req object, which is set by the userAuth middleware

  // sending a connection request
  console.log("sending a connection request");
  res.send(user.firstName + " Connection request sent successfully");
});

module.exports = {
  requestRouter,
};
