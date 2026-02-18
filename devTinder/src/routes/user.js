const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoURL about age gender skills";

// get all the pending connection requests received by the logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA); // this will populate the fromUserId field with the user data of the sender of the connection request, and we are selecting only the safe data of the user to be populated in the fromUserId field, and this will help us to easily get the user data of the sender of the connection request when we query the connection requests collection
    // https://mongoosejs.com/docs/populate.html
    if (connectionRequests) {
      return res.status(200).json({
        connectionRequests,
      });
    }
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

// who has accepted my connection request
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    console.log(loggedInUser);
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId toUserId", USER_SAFE_DATA); // this will populate the fromUserId and toUserId fields with the user data of the sender and receiver of the connection request, and we are selecting only the safe data of the user to be populated in these fields, and this will help us to easily get the user data of the sender and receiver of the connection request when we query the connection requests collection

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() == loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    // user should see all the user cards except
    // his own card
    // his connections
    // ignored people
    // already send the connection request people

    const loggedInUser = req.user;

    // Find all connection requests ( sent + received) of the logged in user
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    })
      .select("toUserId fromUserId status")
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName"); // use select to get only the required fields from the connection requests collection, and this will help us to easily filter out the users who are connected, ignored or already sent the connection request by the logged in user when we query the connection requests collection & use populate to get the user data of the sender and receiver of the connection request, and we are selecting only the firstName field of the user to be populated in these fields, and this will help us to easily get the user data of the sender and receiver of the connection request when we query the connection requests collection

    const hideUsersFromFeed = new Set(); // set is a data structure that stores unique values, and we are using it to store the user ids of the users who are connected, ignored or already sent the connection request by the logged in user, so that we can easily filter out these users from the feed of the logged in user

    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.toUserId._id.toString());
      hideUsersFromFeed.add(req.fromUserId._id.toString());
    });

    // console.log(hideUsersFromFeed);  shows the user ids of the users who are connected, ignored or already sent the connection request by the logged in user

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ], // use $nin operator to filter out the users who are connected, ignored or already sent the connection request by the logged in user when we query the users collection, and we are converting the set of user ids to an array using Array.from() method, and this will help us to easily filter out these users from the feed of the logged in user when we query the users collection
    }).select(USER_SAFE_DATA); // use select to get only the required fields from the users collection, and this will help us to easily display the user data of the users in the feed of the logged in user when we query the users collection
    res.send(users);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = { userRouter };
