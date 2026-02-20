import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
  return (<div>
    <Navbar />
    {/* we need Outlet to render child routes of Body*/}
    <Outlet />
    <Footer />
  </div>);
};

export default Body;
