const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Auth middleware to read the token from the request cookies
// validate the token and extract the user information from it
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided - please Login");
    }
    const decodedObject = await jwt.verify(
      token,
      "secretKeyIKNowThisIsNotASafeWayToStoreTheSecretKeyInProduction",
    );

    const { _id } = decodedObject;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
