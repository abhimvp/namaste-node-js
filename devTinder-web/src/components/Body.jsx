import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // once the user is logged in - we don't have to call profile/view API every time.
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return; // if user data is already present in the store, no need to fetch again
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user data", err);
    }
  };
  // once the component mounts/loaded - useEffect will run and fetch the user data and store it in the redux store
  useEffect(() => {
    fetchUser();
  }, []); // empty dependency array means this effect runs only once when the component mounts
  return (
    <div>
      <Navbar />
      {/* we need Outlet to render child routes of Body*/}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
