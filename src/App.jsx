import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Cookies from "js-cookie";

//Pages
import Home from "./pages/home";
import Offer from "./pages/offer";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

//Components
import Header from "./components/header";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);

  const handleToken = ({ token, userId }) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      Cookies.set("userId", userId, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      Cookies.remove("userId");
      setToken(null);
      setUserId(null);
    }
  };
  return (
    <>
      <Router>
        <Header handleToken={handleToken} token={token} />
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route
            path="/payment"
            element={<Payment token={token} userId={userId} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
