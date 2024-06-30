import { Link } from "react-router-dom";

export default function Header() {
  function logout() {
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("firstName");
    window.location.pathname = "/register";
  }

  const firstName = window.localStorage.getItem("firstName");

  return (
    <nav className="d-flex">
      <div className="d-flex">
        <div className="title">
          <Link to="/" className="find">
            FIND
          </Link>
          <Link to="/" className="me">
            ME
          </Link>
        </div>
      </div>
      <div className="element">
        <Link to="/" className="element-nav">
          Home
        </Link>
      </div>
      <div className="d-flex">
        {!window.localStorage.getItem("email") ? (
          <>
            <Link
              to="/register"
              style={{ marginRight: "5px" }}
              className="reg-nav"
            >
              Register
            </Link>
            <Link to="/login" className="reg-nav">
              login
            </Link>
          </>
        ) : (
          <>
            <h2 className="acc"> Hi , {firstName}!</h2>
            <Link to="/register" className="reg-nav" onClick={logout}>
              logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
