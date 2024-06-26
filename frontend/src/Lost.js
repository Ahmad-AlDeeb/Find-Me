import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";

export default function Lost() {
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    birthday_day: "1",
    birthday_month: "5",
    birthday_year: "2024",
    photo: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [id]: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.sex) newErrors.sex = "Sex is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("sex", formData.sex);
      data.append("birthday_day", formData.birthday_day);
      data.append("birthday_month", formData.birthday_month);
      data.append("birthday_year", formData.birthday_year);
      if (formData.photo) data.append("photo", formData.photo);

      try {
        const response = await axios.post("http://127.0.0.1:8000/lost", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          alert("Data submitted successfully");
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while submitting the data");
      }
    }
  };

  return (
    <div className="parent">
      <>
        <Header />
      </>
      <div className="home">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span>{errors.name}</span>}

          <div>Sex</div>
          <div className="select" id="u_4_n_Yf">
            <input
              type="radio"
              className="select"
              name="sex"
              value="female"
              id="female_radio"
              checked={formData.sex === "female"}
              onChange={handleChange}
            />
            <label className="select" htmlFor="female_radio">
              Female
            </label>
            <input
              type="radio"
              className="select"
              name="sex"
              value="male"
              id="male_radio"
              checked={formData.sex === "male"}
              onChange={handleChange}
            />
            <label className="select" htmlFor="male_radio">
              Male
            </label>
            {errors.sex && <span>{errors.sex}</span>}
          </div>

          <div id="birthday_wrapper">
            <div>Date of birth</div>
            <div>
              <select
                aria-label="Day"
                name="birthday_day"
                id="birthday_day"
                title="Day"
                className="select1"
                value={formData.birthday_day}
                onChange={handleChange}
              >
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                aria-label="Month"
                name="birthday_month"
                id="birthday_month"
                title="Month"
                className="select1"
                value={formData.birthday_month}
                onChange={handleChange}
              >
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month, i) => (
                  <option key={i + 1} value={i + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                aria-label="Year"
                name="birthday_year"
                id="birthday_year"
                title="Year"
                className="select1"
                value={formData.birthday_year}
                onChange={handleChange}
              >
                {[...Array(100)].map((_, i) => (
                  <option key={i} value={2024 - i}>
                    {2024 - i}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
