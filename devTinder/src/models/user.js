const mongoose = require("mongoose");

const { Schema } = mongoose;

// define all the properties of the user in the schema that we will store in the DB, and their data types
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
});

// https://mongoosejs.com/docs/guide.html#models - To use our schema definition, we need to convert our Schema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema)
const User = mongoose.model("User", userSchema); // create a model named User using the userSchema, and this will create a collection named users in the DB
// By default, Mongoose adds an _id property to your schemas
// When you create a new document with the automatically added _id property, Mongoose creates a new _id of type ObjectId to your document

module.exports = User; // export the User model so that we can use it in other files to perform CRUD operations on the users collection in the DB
