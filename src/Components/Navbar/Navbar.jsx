import { Link } from "react-router-dom";
import "./Styles.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list nav-list1">
        <li className="nav-heading">pathfinding visualizer</li>
        <ul className="nav-list nav-list2">
          <li className="nav-links">
            <Link to="/">home</Link>
          </li>
          <li className="nav-links">
            <Link to="/visualizer">visualiser</Link>
          </li>
          <li className="nav-links">
            <Link to="/">algorithms</Link>
          </li>
        </ul>
      </ul>
    </nav>
  );
}
