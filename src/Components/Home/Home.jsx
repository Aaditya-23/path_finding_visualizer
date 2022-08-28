import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import RotatingHomeGrid from "./RotatingHomeGrid";
import "./Styles.css";

// import ThreeLogo from "../../Assets/Images/ThreeLogo.svg";
// import ReactLogo from "../../Assets/Images/ReactLogo.svg";
// import ReduxLogo from "../../Assets/Images/ReduxLogo.svg";

export default function () {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <div>
          <div className="motto">
            <span className="green-text">Visualize &nbsp;</span>
            <span className="cyan-text">Path Finding Algorithms &nbsp;</span>
            <span className="yellow-text">in a 3-Dimensional &nbsp;</span>
            <span className="white-text">World.</span>
          </div>
          <div className="rotatingGrid">
            <RotatingHomeGrid props={{ setLoaded }} />
          </div>

          <div className="features">
            <div className="feature1">
              <motion.div className="feature-name" animate={{ x: 100 }}>
                Orbit Controls
              </motion.div>
              <div className="feature-description"></div>
            </div>
            <div className="feature2">
              <motion.div className="feature-name" animate={{ x: 100 }}>
                Maze Generator
              </motion.div>
              <div className="feature-description"></div>
            </div>
            <div className="feature3">
              <motion.div className="feature-name" animate={{ x: 100 }}>
                More Algorithms
              </motion.div>
              <div className="feature-description"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

//  <div className="tech-info">
//    <div className="tech-heading">
//      <span className="green-text">Technologies &nbsp;</span>
//      <span className="white-text">Used</span>
//    </div>

//    <div className="section">
//      <div className="tech-container">
//        <img src={ThreeLogo} alt="React Three Fiber" />
//        <div className="tech-name" animate={{x: 100}}>React Three Fiber</div>
//      </div>
//      <div className="tech-container">
//        <img alt="svgImg" src={ReactLogo} />
//        <div className="tech-name" animate={{x: 100}}>React</div>
//      </div>
//      <div className="tech-container">
//        <img src={ReduxLogo} alt="React Redux" />
//        <div className="tech-name" animate={{x: 100}}>Redux</div>
//      </div>
//    </div>
//  </div>;
