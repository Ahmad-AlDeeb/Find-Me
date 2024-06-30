import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sadFaceImage from "./img/7.jpg";
import { useLocation } from 'react-router-dom';
import Header from "./components/Header";
import "./confirm.css";

export default function Confirm() {
  const [showSorryMessage, setShowSorryMessage] = useState(false);
  const location = useLocation();
  const { state } = location;

  const handleAnswer = async (answer) => {
    if (answer === "yes") {
      try {
        const response = await fetch("http://localhost:8000/result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answer }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Answer submitted successfully");
        navigate("/user-details");
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    } else if (answer === "no") {
      setShowSorryMessage(true);
    }
  };
  
  return (
    <div>
      <Header/>
      <div className="conf">
        <div className="left-side">
          {state.image ? (
            <img src={`http://127.0.0.1:8000/${state.image}`} alt="Fetched from server" className="image" />
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
              ) : (
                <form>
                  <div className="text">
                    <h3>This is the best match we could find.</h3>
                    <h2>
                      <strong>Is he/she the same child?</strong>
                    </h2>
                  </div>
                  <div className="buttons-home">
                    <button
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
                  <div className="btn"></div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
