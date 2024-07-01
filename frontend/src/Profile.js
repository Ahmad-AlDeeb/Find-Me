import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import "./style.css";

export default function Profile() {
  const { state } = useLocation();
  const { userData } = state || {};
  const [formData, setFormData] = useState(userData || {});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const id = localStorage.getItem("id");
      const updatedFormData = new FormData();
      updatedFormData.append("id", id);
      updatedFormData.append("first_name", formData.first_name);
      updatedFormData.append("last_name", formData.last_name);
      updatedFormData.append("phone", formData.phone);
      updatedFormData.append("state", formData.state);
      updatedFormData.append("city", formData.city);

      const response = await axios.put(
        `http://127.0.0.1:8000/users/${id}/`,
        updatedFormData,
      );
      console.log("User data updated successfully:", response);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile.");
    }
  };
  return (
    <div>
      <Header />
      <div className="parent">
        <div className="login">
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <h1 className="title-profile">Update Profile</h1>
            <div>
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
              />
            </div>
            <div className="btn">
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
