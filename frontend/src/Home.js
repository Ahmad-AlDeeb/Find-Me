import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import "boxicons/css/boxicons.min.css";
import "./style.css";

export default function Home() {
  const inputFileRef = useRef(null);
  const imgAreaRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [imgName, setImgName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [noMatch, setNoMatch] = useState(false);
  const navigate = useNavigate();

  const handleSelectImageClick = () => {
    inputFileRef.current.click();
  };

  const handleInputChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result);
        setImgName(image.name);
        setNoMatch(false);
      };
      reader.readAsDataURL(image);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userEmail = window.localStorage.email;
    if (!userEmail) {
      toast.warn("Please log in first!");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
      return;
    }

    if (!selectedOption) {
      toast.error("Please select an option.");
      return;
    }
    if (!imgSrc) {
      toast.error("Please upload an image.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("img", inputFileRef.current.files[0]);
    formData.append("status", selectedOption);
    formData.append("email", userEmail);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/reports/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const percentage = response.data.data.percentage;

      toast.success("Image uploaded successfully!");
      navigate("/confirm", {
        state: {
          image: response.data.data.image,
          user: response.data.user,
          percentage: percentage,
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      setNoMatch(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="parent">
        <ToastContainer />
        <div
          className="home"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            className="left-form"
            style={{ flex: "0 0 45%", marginRight: "20px" }}
          >
            <form>
              <h2 className="title-home">Please select person status</h2>
              <div className="options-home">
                <label
                  className={`custom-radio ${
                    selectedOption === "L" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value="L"
                    checked={selectedOption === "L"}
                    onChange={handleOptionChange}
                  />
                  Lost
                </label>
                <label
                  className={`custom-radio ${
                    selectedOption === "F" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value="F"
                    checked={selectedOption === "F"}
                    onChange={handleOptionChange}
                  />
                  Found
                </label>
              </div>
            </form>
          </div>
          <div className="right-form" style={{ flex: "0 0 45%" }}>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                id="file"
                accept="image/*"
                hidden
                ref={inputFileRef}
                onChange={handleInputChange}
              />
              <div className="img-area" data-img={imgName} ref={imgAreaRef}>
                {imgSrc && !noMatch ? (
                  <img src={imgSrc} alt="Uploaded" />
                ) : (
                  <>
                    <i className="bx bxs-cloud-upload icon"></i>
                    <h3>
                      {noMatch ? (
                        <h5 className="match">
                          <strong>Sorry, No images match request.</strong>
                        </h5>
                      ) : (
                        "Upload Image"
                      )}
                    </h3>
                  </>
                )}
              </div>
              <button
                type="button"
                className="select-image"
                onClick={handleSelectImageClick}
              >
                Select Image
              </button>
              <div className="btn">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
