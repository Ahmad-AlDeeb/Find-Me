import React, { useRef, useState } from "react";
import axios from "axios";
import "./style.css";
import "boxicons/css/boxicons.min.css";
import Header from "./components/Header";
import { Link } from "react-router-dom";
export default function Found() {
  const inputFileRef = useRef(null);
  const imgAreaRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [imgName, setImgName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectImageClick = () => {
    inputFileRef.current.click();
  };

  const handleInputChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result);
      setImgName(image.name);
    };
    reader.readAsDataURL(image);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", inputFileRef.current.files[0]);

    try {
      const response = await axios.post("http://127.0.0.1:8000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully:", response.data);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="parent">
      <Header />
      <div className="home">
        <Link to="/home" className="back-button">
          <i className="bx bx-chevron-left"></i>
        </Link>
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
            {imgSrc ? (
              <img src={imgSrc} alt="Uploaded" />
            ) : (
              <>
                <i className="bx bxs-cloud-upload icon"></i>
                <h3>Upload Image</h3>
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
              {isLoading ? "Uploading..." : "Share"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
