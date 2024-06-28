import Header from "./components/Header";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="parent-home">
      <Header />
      <h2 className="title-home">Please choose from the options</h2>
      <div className="buttons-home">
        <Link to="/Lost" className="home-button">
          Missing person
        </Link>
        <Link to="/found" className="blue-button">
          Person found
        </Link>
      </div>
    </div>
  );
}
