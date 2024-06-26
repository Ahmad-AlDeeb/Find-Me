import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";

export default function Found() {
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photo) {
      const formData = new FormData();
      formData.append("photo", photo);

      try {
        const response = await axios.post("  HTTP ", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          alert("Photo uploaded successfully");
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while uploading the photo");
      }
    } else {
      alert("Please select a photo to upload");
    }
  };

  return (
    <div className="parent">
      <>
        <Header />
      </>
      <div className="home">
        <form onSubmit={handleSubmit}>
          <div className="photo-upload">
            <label htmlFor="photo">Upload a photo or take a new one:</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              capture="camera"
              onChange={handleChange}
            />
          </div>

          <div className="btn">
            <button type="submit">Share</button>
          </div>
        </form>
      </div>
    </div>
  );
}
