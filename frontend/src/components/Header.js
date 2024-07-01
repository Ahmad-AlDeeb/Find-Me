import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("firstName");
    window.location.pathname = "/";
  }

  const firstName = window.localStorage.getItem("firstName");

  const handleProfileClick = async () => {
    const id = window.localStorage.getItem("id");
    if (!id) {
      toast.warn("Please log in first!");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/users/${id}/`);
      console.log("User data fetched successfully:", response);
      navigate("/profile", {
        state: { userData: response.data },
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data.");
    }
  };

  return (
    <nav className="d-flex">
      <div className="d-flex">
        <div className="title">
          <Link to="/" className="find">
            FIND
          </Link>
          <Link to="/" className="me">
            ME
          </Link>
        </div>
      </div>
      <div className="element">
        {/* <Link to="/" className="element-nav">
          Home
        </Link> */}
      </div>
      <div className="d-flex">
        {!window.localStorage.getItem("email") ? (
          <>
            <Link
              to="/register"
              style={{ marginRight: "5px" }}
              className="reg-nav"
            >
              Register
            </Link>
            <Link to="/login" className="reg-nav">
              Login
            </Link>
          </>
        ) : (
          <>
            <div className="acc" onClick={handleProfileClick}>
              Hi, {firstName}
            </div>
            <div to="/home" className="reg-nav" onClick={logout}>
              Logout
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
