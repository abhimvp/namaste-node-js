import Navbar from "./Navbar";
import Body from "./Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        {/* basename is used to set the base URL for all routes */}
        <Navbar />
        <h1 className="text-3xl font-bold underline">Hello world!</h1>

        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/login" element={<div>Login Page</div>} />
          {/* path is used to define the URL for the route & element is used to define the component to render or returns jsx  */}
          <Route path="/signup" element={<div>Signup Page</div>} />
          <Route path="/logout" element={<div>Logout Page</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
