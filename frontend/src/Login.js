import axios from "axios";
import { useState } from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import img from "./img/4.jpg";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [accept, setaccept] = useState(false);
  const [emailer, setemailer] = useState("");

  async function submit(e) {
    let flag = true;
    e.preventDefault();
    setaccept(true);

    if (password.length < 8) {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
        let res = await axios.post("http://127.0.0.1:8000/login/", {
          email: email,
          password: password,
        });
        if (res.status === 200) {
          window.localStorage.setItem("email", email);
          window.localStorage.setItem("firstName", res.data.email);
          window.location.pathname = "/";
        }
      }
    } catch (err) {
      setemailer(err.response.status);
    }
  }

  return (
    <div style={{ background: "black", height: "100vh", overflow: "hidden" }}>
      <>
        <Header />
      </>
      <div className="parent">
        <div className="login">
          <img
            src={img}
            alt=""
            style={{
              width: "60%",
              marginTop: "20px",
              marginRight: "15px",
              borderRadius: "10px",
            }}
          />
          <form onSubmit={submit}>
            <div style={{ fontSize: "40px", marginBottom: "20px" }}>
              Sign in
            </div>
            <div style={{ fontSize: "18px" }}>
              If you don’t have an account register you can :-
            </div>
            <Link
              to="/register"
              style={{
                color: "#C10C99",
                fontSize: "18px",
                marginBottom: "20px",
              }}
            >
              Register here !
            </Link>
            <label htmlFor="email"> Email :</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label htmlFor="pass"> Password :</label>
            <input
              id="pass"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            {password.length < 8 && accept && (
              <p className="error">pass must be more than 8 char</p>
            )}
            {emailer === 400 && accept && (
              <p className="error"> email or password invaild</p>
            )}
            <div className="btn">
              <button type="submit">login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
