// write the logic to connect to the DB

const mongoose = require("mongoose");

// Connection URL
require("dotenv").config();
const url = process.env.URI;
if (!url) throw new Error("MONGODB_URL (or MONGODB_URI) not set in .env");

// to connect to the DB we need the URI of the DB & use async await to connect to the DB
// because connecting to the DB is an asynchronous operation and we need to wait for it to complete before proceeding with the rest of the code.

const connectDB = async () => {
  await mongoose.connect(url);
};

module.exports = connectDB;
