// Manages the connection request related routes using express router

const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id; //userAuth req.user is the authenticated user(from)
      const toUserId = req.params.toUserId;
      const status = req.params.status; // interested, accepted

      const allowedStatus = ["interested", "ignored"];

      if (allowedStatus.includes(status) === false) {
        return res
          .status(400)
          .json({ message: "Invalid status type : " + status });
      }

      // check if the fromUserId is not same as toUserId
      // if (fromUserId.toString() === toUserId) {
      //   return res
      //     .status(400)
      //     .json({
      //       message: "You cannot send a connection request to yourself",
      //     });
      // }

      // check if the toUserId is present in the database or not
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // check if there is already a connection request between the two users
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          // check if there is a connection request from fromUserId to toUserId or from toUserId to fromUserId
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Connection request already exists between the two users",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save(); // will save the connection request to the database
      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
        success: true,
      });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user; // receiver of the connection request(toUserId)
      const { status, requestId } = req.params;

      //Validate Status
      const allowedStatuses = ["accepted", "rejected"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid Status or Status not allowed",
          success: false,
        });
      }

      //validating the request
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(404).json({
          message: "request not found ",
          success: false,
        });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.status(200).json({
        message: "Connection request " + status,
        data,
        success: true,
      });
    } catch (error) {
      res.status(400).send("ERROR:" + error.message);
    }
  },
);

module.exports = {
  requestRouter,
};
