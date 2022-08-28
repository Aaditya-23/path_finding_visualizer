import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import RotatingHomeGrid from "./RotatingHomeGrid";
import { useSelector } from "react-redux";
import "./Styles.css";

// import ThreeLogo from "../../Assets/Images/ThreeLogo.svg";
// import ReactLogo from "../../Assets/Images/ReactLogo.svg";
// import ReduxLogo from "../../Assets/Images/ReduxLogo.svg";

export default function () {
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
            <RotatingHomeGrid />
          </div>
        </div>

        <div className="features">
          <div className="feature-container">
            <div
              className="feature-name green-text"
              initial={{ x: -200 }}
              animate={{ x: 100 }}
              transition={{ delay: 1.5 }}
            >
              Orbital Controls
            </div>
            <div className="feature-description">
              Grid is set up in a 3-Dimensional world. You can use your mouse to
              PAN the scene. ZOOM in and out of the scene which is set up in
              OUTER SPACE!
            </div>
          </div>

          <div className="feature-container">
            <div className="feature-description">
              Drawing over the maze again and again can be CUMBERSOME!
              So You can use 
            </div>
            <div
              className="feature-name cyan-text"
              style={{ textAlign: "end" }}
              initial={{ x: -200 }}
              animate={{ x: 100 }}
              transition={{ delay: 1.5 }}
            >
              Maze Generator
            </div>
          </div>

          <div className="feature-container">
            <div
              className="feature-name yellow-text"
              initial={{ x: -200 }}
              animate={{ x: 100 }}
              transition={{ delay: 1.5 }}
            >
              More Algorithms
            </div>
            <div className="feature-description">
              Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
              Ipsum{" "}
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
