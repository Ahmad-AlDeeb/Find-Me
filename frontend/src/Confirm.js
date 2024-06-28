import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import "./confirm.css";

export default function Confirm() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("http://localhost:8000/getImage");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImage(imageObjectURL);
      } catch (error) {
        console.error("There was a problem with fetching the image:", error);
      }
    };

    fetchImage();
  }, []);

  const handleAnswer = async (answer) => {
    const url = `http://localhost:8000/result?answer=${answer}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Answer submitted successfully");
      // هنا يمكن إضافة إعادة توجيه أو رسالة تأكيد
      if (answer === "yes") {
        // توجيه المستخدم إلى صفحة التفاصيل (parent or helper)
      } else {
        // عرض رسالة "sorry"
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="conf">
        <div className="left-side">
          {image ? (
            <img src={image} alt="Fetched from server" className="image" />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
