import { Link } from "react-router-dom";
export default function Topbar() {
  return (
    <div className="d-flex container tob-bar">
      <div className="title">
        <Link to="/home" className="find">
          FIND
        </Link>
        <Link to="/home" className="me">
          ME
        </Link>
      </div>
      <Link to="/" className="reg-nav">
        GO TO WEB SITE
      </Link>
    </div>
  );
}
