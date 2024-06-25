import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="side-bar ">
     
      <Link to="/dashboard/users" className="item-link">Users</Link>
    </div>
  );
}
