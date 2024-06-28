import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import img from "./img/3.jpg";

export default function SignUp() {
  const [formData, setFormData] = useState({
    Fname: "",
    Lname: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
    state: "",
    city: "",
  });
  const [accept, setAccept] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailer, setEmailer] = useState("");

  const validate = () => {
    const newErrors = {};
    if (formData.Fname === "") newErrors.Fname = "First name is required";
    if (formData.Lname === "") newErrors.Lname = "Last name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (formData.password.length < 8)
      newErrors.password = "Password must be more than 8 characters";
    if (formData.password !== formData.repassword)
      newErrors.repassword = "Passwords do not match";
    if (formData.phone === "") newErrors.phone = "Phone number is required";
    if (formData.state === "") newErrors.state = "State is required";
    if (formData.city === "") newErrors.city = "City is required";

    return newErrors;
  };

  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        let res = await axios.post("http://127.0.0.1:8000/register/", {
          fname: formData.Fname,
          lname: formData.Lname,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.repassword,
          phone: formData.phone,
          state: formData.state,
          city: formData.city,
        });
        if (res.status === 200) {
          window.localStorage.setItem("email", formData.email);
          window.location.pathname = "/home";
        }
      } catch (err) {
        setEmailer(err.response.status);
      }
    }
  }

  const handleChange = (e) => {
    if (e.target.id === "state" || e.target.id === "city") {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  return (
    <div>
      <Header />
      <div className="parent">
        <div className="register">
          <img
            src={img}
            alt=""
            style={{
              width: "60%",
              height: "150%",
              marginTop: "450px",
              marginRight: "15px",
              borderRadius: "10px",
              visibility: "hidden",
            }}
          />
          <form style={{ height: "100%" }} onSubmit={submit}>
            <div style={{ fontSize: "40px", marginBottom: "1px" }}>Sign up</div>
            <div style={{ fontSize: "18px" }}>
              If you already have an account register you can :-
            </div>
            <Link
              to="/login"
              style={{
                color: "#C10C99",
                fontSize: "18px",
                marginBottom: "5px",
              }}
            >
              login here!
            </Link>
            <label htmlFor="Fname">First Name:</label>
            <input
              id="Fname"
              type="text"
              placeholder="Enter your first name"
              value={formData.Fname}
              onChange={handleChange}
            />
            {accept && errors.Fname && <p className="error">{errors.Fname}</p>}

            <label htmlFor="Lname">Last Name:</label>
            <input
              id="Lname"
              type="text"
              placeholder="Enter your last name"
              value={formData.Lname}
              onChange={handleChange}
            />
            {accept && errors.Lname && <p className="error">{errors.Lname}</p>}

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
            {accept && errors.email && <p className="error">{errors.email}</p>}
            {emailer === 422 && accept && (
              <p className="error">Email is already taken</p>
            )}

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {accept && errors.password && (
              <p className="error">{errors.password}</p>
            )}

            <label htmlFor="repassword">Confirm Password:</label>
            <input
              id="repassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.repassword}
              onChange={handleChange}
            />
            {accept && errors.repassword && (
              <p className="error">{errors.repassword}</p>
            )}

            <label htmlFor="phone">Phone Number:</label>
            <input
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            {accept && errors.phone && <p className="error">{errors.phone}</p>}

            <label htmlFor="state">State:</label>
            <input
              id="state"
              type="text"
              placeholder="Enter your state"
              value={formData.state}
              onChange={handleChange}
            />
            {accept && errors.state && <p className="error">{errors.state}</p>}

            <label htmlFor="city">City:</label>
            <input
              id="city"
              type="text"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleChange}
            />
            {accept && errors.city && <p className="error">{errors.city}</p>}

            <div className="btn">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
