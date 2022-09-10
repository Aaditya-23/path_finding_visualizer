import {
  ArrowBackIosNewRounded,
  AutoAwesomeMosaic,
  GitHub,
  LinkedIn,
} from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function DeviceView() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [isOpen, setIsOpen] = useState(true);

  const variants = {
    open: {
      width: "20%",
      opacity: 1,
    },
    closed: {
      width: 0,
      opacity: 0,
      transition: { type: "tween" },
    },
  };

  const closeDrawer = () => {
    setIsOpen((prevState) => false);
  };

  const openDrawer = () => {
    setIsOpen((prevState) => true);
  };

  return (
    <motion.div
      id="guide"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ type: "tween" }}
      className="device-view"
    >
      <div className="screen">
        <motion.div
          className="drawer"
          animate={isOpen ? "open" : "closed"}
          variants={variants}
        >
          <div className="drawer-logo">
            <span tabIndex="0" onClick={closeDrawer}>
              <ArrowBackIosNewRounded />
            </span>
          </div>

          <ul className="drawerList">
            <li className="list-element">
              <Link to="/">Features</Link>
            </li>

            <li className="list-element">
              <Link to="/howto">Walkthrough</Link>
            </li>

            <li className="list-element">
              <Link to="/algorithms">Algorithms</Link>
            </li>
          </ul>
          <div className="profiles">
            <a href="https://www.linkedin.com/in/aaditya-verma-523069224/">
              <LinkedIn />
            </a>
            <Link to="/">
              <GitHub />
            </Link>
          </div>
        </motion.div>

        <div className="screen-layout">
          <span style={{}} onClick={openDrawer}>
            {!isOpen && <AutoAwesomeMosaic />}
          </span>
          <div className="screen-content">
            <Outlet />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
