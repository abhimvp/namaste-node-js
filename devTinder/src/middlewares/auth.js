// middleware function to check if the user is authenticated or not, this will be used in the routes to protect the routes from unauthorized access, we will have two types of authentication, one for admin and one for user, we will check the token in the request header and if the token is valid then we will allow the user to access the route, otherwise we will send a response back to the client with an error message and status code 401 (Unauthorized)

const adminAuth = (req, res, next) => {
  console.log("Admin Auth is getting checked first");
  const token = "xyz";
  const isAuthenticated = token === "xyz"; // this is just a dummy authentication logic, in real world we will have more complex logic to check if the user is authenticated or not, such as checking the token in the database, checking the expiration time of the token, etc.
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized"); // if the user is not authenticated, send a response back to the client with an error message and status code 401 (Unauthorized)
  } else {
    next(); // if the user is authenticated, call the next middleware function to get the data from the database and send it back to the client
  }
};

const userAuth = (req, res, next) => {
  console.log("User Auth is getting checked first");
  const token = "xyz";
  const isAuthenticated = token === "xyz"; // this is just a dummy authentication logic, in real world we will have more complex logic to check if the user is authenticated or not, such as checking the token in the database, checking the expiration time of the token, etc.
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized"); // if the user is not authenticated, send a response back to the client with an error message and status code 401 (Unauthorized)
  } else {
    next(); // if the user is authenticated, call the next middleware function to get the data from the database and send it back to the client
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
