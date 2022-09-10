import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";
import "./Styles.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list nav-list1">
        <motion.li
          drag
          dragSnapToOrigin={true}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          dragConstraints={{
            left: 50,
            right: 50,
            bottom: 50,
            top: 10,
          }}
          className="nav-heading"
        >
          pathfinding visualizer
        </motion.li>
        <ul className="nav-list nav-list2">
          <li className="nav-links">
            <Link to="/">home</Link>
          </li>
          <li className="nav-links">
            <Link to="/visualizer">visualiser</Link>
          </li>
          <li className="nav-links">
            <HashLink
              smooth
              scroll={(el) => {
                el.scrollIntoView({ behavior: "smooth" });
              }}
              to="#guide"
            >
              algorithms
            </HashLink>
          </li>
        </ul>
      </ul>
    </nav>
  );
}
