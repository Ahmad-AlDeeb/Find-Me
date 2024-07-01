import React, { useState } from "react";
import sadFaceImage from "./img/7.jpg";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import "./confirm.css";
import { Link } from "react-router-dom";

export default function Confirm() {
  const [showSorryMessage, setShowSorryMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const location = useLocation();
  const { state } = location;
  const handleAnswer = (answer) => {
    if (answer === "yes") {
      setShowSuccessMessage(true);
    } else if (answer === "no") {
      setShowSorryMessage(true);
    }
  };
  return (
    <div>
      <Header />
      <div className="conf">
        <div className="left-side">
          {state && state.image ? (
            <img
              src={`http://127.0.0.1:8000/${state.image}`}
              alt="Fetched from server"
              className="image"
            />
          ) : (
            <div className="loading-box">
              <div className="loading">
                Loading image<span className="spinner"></span>
              </div>
            </div>
          )}
        </div>
        <div className="right-side">
          <div className="parent">
            <div className="home">
              <Link to="/" className="back-button">
                <i className="bx bx-chevron-left"></i>
              </Link>
              {showSorryMessage ? (
                <form style={{ background: "black" }}>
                  <div className="sorry-message">
                    <img
                      src={sadFaceImage}
                      alt="Sad face"
                      className="sad-face"
                    />
                    <h2>
                      Sorry, but don't worry if someone found him he will
                      contact you.
                    </h2>
                  </div>
                </form>
              ) : showSuccessMessage ? (
                <form>
                  <div>
                    <p>
                      {state && state.user ? (
                        <div className="user-details">
                          <h1> User Details </h1>
                          <h3> First Name: {state.user.first_name} </h3>
                          <h3> Last Name: {state.user.last_name} </h3>
                          <h3> Phone: {state.user.phone} </h3>
                          <h3> State: {state.user.state} </h3>
                          <h3> City: {state.user.city} </h3>
                        </div>
                      ) : (
                        <div className="loading-box">
                          <div className="loading">
                            Loading user<span className="spinner"></span>
                          </div>
                        </div>
                      )}
                    </p>
                  </div>
                </form>
              ) : (
                <form>
                  <div className="text">
                    <h2>This is the best match we could find.</h2>
                    <h2>
                      <strong>Is he/she the same child?</strong>
                    </h2>
                  </div>
                  <div className="buttons-home">
                    <button
                      style={{ marginRight: "10px" }}
                      type="button"
                      className="yes-button"
                      onClick={() => handleAnswer("yes")}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="no-button"
                      onClick={() => handleAnswer("no")}
                    >
                      No
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
