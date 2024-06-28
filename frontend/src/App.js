import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import About from "./About";
import Dash from "./Dash";
import Users from "./Users";
import Home from "./Home";
import Found from "./Found";
import Lost from "./Lost";
import "boxicons/css/boxicons.min.css";
import Confirm from "./Confirm";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/found" element={<Found />}></Route>
        <Route path="/Lost" element={<Lost />}></Route>
        <Route path="/confirm" element={<Confirm />}></Route>
        <Route path="about" element={<About />} />
        <Route path="/about" element={<About />}></Route>
        <Route path="/dashboard" element={<Dash />}>
          <Route exact path="users" element={<Users />}></Route>
        </Route>
      </Routes>
    </div>
  );
}
