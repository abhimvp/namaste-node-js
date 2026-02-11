const mongoose = require("mongoose");
var validator = require("validator");
const { Schema } = mongoose;

// define all the properties of the user in the schema that we will store in the DB, and their data types
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true, // this will make the firstName field required, so if we try to save a user document without the firstName field, it will throw an error
      trim: true, // this will remove any leading or trailing whitespace from the firstName field before saving it to the DB, so that we can avoid duplicate names with different cases and whitespace
      minlength: 4, // this will set the minimum length of the firstName field to 2 characters, so if we try to save a user document with a firstName that is less than 2 characters long, it will throw an error
      maxlength: 20, // this will set the maximum length of the firstName field to 20 characters, so if we try to save a user document with a firstName that is more than 20 characters long, it will throw an error
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // this will make the email field unique, so if we try to save a user document with an email that already exists in the DB, it will throw an error
      lowercase: true, // this will convert the email to lowercase before saving it to the DB, so that we can avoid duplicate emails with different cases
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address : " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // this will set the minimum length of the password field to 6 characters, so if we try to save a user document with a password that is less than 6 characters long, it will throw an error
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password :" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18, // this will set the minimum value of the age field to 18, so if we try to save a user document with an age that is less than 18, it will throw an error
    },
    gender: {
      type: String,
      // have a custom validator to allow only male,female,other as valid values for the gender
      validate: {
        validator: function (value) {
          // works only when we are creating a new user document, if we are updating an existing user document and we try to update the gender field, then this validator will not work
          if (!["male", "female", "other"].includes(value.toLowerCase())) {
            throw new Error("Gender must be either male, female, or other");
          } else {
            return true;
          }
        },
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL : " + value);
        }
      },
    },
    about: {
      type: String,
      default: "Hey there! I am using DevTinder.", // this will set the default value of the about field to "Hey there! I am using DevTinder." if we don't provide any value for the about field when creating a new user document
      trim: true,
    },
    skills: {
      type: [String], // this will allow us to store an array of strings in the skills field, for example: ["JavaScript", "Node.js", "React"]
    },
  },
  { timestamps: true },
); // this will add createdAt and updatedAt fields to the user document, and automatically set their values when we create or update a user document in the DB

// https://mongoosejs.com/docs/guide.html#models - To use our schema definition, we need to convert our Schema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema)
const User = mongoose.model("User", userSchema); // create a model named User using the userSchema, and this will create a collection named users in the DB
// By default, Mongoose adds an _id property to your schemas
// When you create a new document with the automatically added _id property, Mongoose creates a new _id of type ObjectId to your document

module.exports = User; // export the User model so that we can use it in other files to perform CRUD operations on the users collection in the DB
