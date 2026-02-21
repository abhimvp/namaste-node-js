import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = () => {
  const user = useSelector((store) => store.user); // this will give us the user data from the redux store, and we can use that user data to show the user's name, email, etc. in the navbar or any other component where we want to show the user's information
  console.log(user); // this will log the user data in the console, and we can see that we are getting the user data from the redux store, and we can use that user data to show the user's name, email, etc. in the navbar or any other component where we want to show the user's information
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className="form-control">Welcome, {user.firstName}</div>
          {/* show the profile icon when the user is logged in */}

          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="DP" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
