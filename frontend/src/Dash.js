import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
export default function Dash() {
  return (
    <div>
      <Header/>
      <div className="cont-flex">
        <Sidebar />
        <div style={{ width: "90%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
