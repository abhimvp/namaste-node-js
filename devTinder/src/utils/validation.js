const validator = require("validator");

// validate signup data
const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email address : " + email);
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password :" + password);
  }
};

// validate profile edit data
const validateEditProfileData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "email",
    "gender",
    "age",
    "about",
    "skills",
    "photoUrl",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field),
  );

  return isEditAllowed;
};

module.exports = {
  validateSignupData,
  validateEditProfileData,
};
