import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      // withCredentials: true is needed to allow the frontend to send cookies in the requests to the backend, and this is also a security measure to prevent cross-site request forgery (CSRF) attacks, and also to allow the frontend to access the resources on the backend without any issues, and we can also specify other options like allowed methods, allowed headers, etc. if needed
      // console.log(response.data);
      // Now i will store the user data in the redux store, and then i will redirect the user to the profile page, and also i will show a success message to the user - so we need a hook - useDispatch from react-redux to dispatch the action to update the user data in the redux store, and we also need to import the addUser action from the userSlice to dispatch it with the user data that we get from the response
      // we have created the addUser action in the userSlice, which will take the user data as payload and update the state with that user data, so we can dispatch that action here with the user data that we get from the response, and then we can redirect the user to the profile page using the useNavigate hook from react-router-dom
      dispatch(addUser(response.data)); // this will update the user state in the redux store with the user data that we get from the response, and then we can access that user data in any component that is connected to the redux store, and we can also use that user data to show the user's name, email, etc. in the profile page or any other page where we want to show the user's information
      return navigate("/"); // this will redirect the user to the main page after successful login, and we can also show a success message to the user using a toast or any other method if needed
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Enter your email"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Enter your password"
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
