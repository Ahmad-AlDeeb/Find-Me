import axios from "axios";
import { useState } from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";

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
          window.localStorage.setItem("firstName", res.data.first_name);
          window.localStorage.setItem("id", res.data.id);
          window.location.pathname = "/";
        }
      }
    } catch (err) {
      setemailer(err.response.status);
    }
  }
  return (
    <div>
      <>
        <Header />
      </>
      <div className="parent">
        <div className="login">
          <form onSubmit={submit}>
            <div style={{ fontSize: "40px", marginBottom: "20px" }}>
              Sign in
            </div>
            <div style={{ fontSize: "18px" }}>
              If you don’t have an account, you can:
            </div>
            <Link
              to="/register"
              style={{
                color: "#4d47c3",
                fontSize: "18px",
                marginBottom: "20px",
              }}
            >
              Register here!
            </Link>
            <label htmlFor="email"> Email:</label>
            <input
              id="email"
              type="email"
              placeholder=" Enter your email address"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label htmlFor="pass"> Password:</label>
            <input
              id="pass"
              type="password"
              placeholder=" Enter your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            {password.length < 8 && accept && (
              <p className="error">pass must be more than 8 char</p>
            )}
            {emailer === 500 && accept && (
              <p className="error"> email or password invaild</p>
            )}
            <div className="btn">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
