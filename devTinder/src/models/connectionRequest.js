// this model will define the connection request between two users

const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        // https://mongoosejs.com/docs/validation.html#custom-error-messages
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//compound index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
// 1 means ascending order, and this will create a compound index on the fromUserId and toUserId fields, and this will help us to quickly find the connection request between two users, and also to quickly find all the connection requests sent by a user or received by a user, and this will improve the performance of our queries on the connection requests collection, especially when we have a large number of connection requests in the database

// https://mongoosejs.com/docs/middleware.html#error-handling
connectionRequestSchema.pre("save", function () {
  // this will run before saving the connection request to the database
  const connectionRequest = this;
  // check if my fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send a connection request to yourself");
  }
  // In synchronous pre middleware, don't need to call next() - just return or throw
});

// Prevent model overwrite during hot-reload
const ConnectionRequest = mongoose.models.ConnectionRequest || mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = ConnectionRequest;
