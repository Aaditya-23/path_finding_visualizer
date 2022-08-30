import { IosShare, LinkedIn } from "@mui/icons-material";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import DeviceView from "./DeviceView";
import RotatingHomeGrid from "./RotatingHomeGrid";
import "./Styles.css";

// import ThreeLogo from "../../Assets/Images/ThreeLogo.svg";
// import ReactLogo from "../../Assets/Images/ReactLogo.svg";
// import ReduxLogo from "../../Assets/Images/ReduxLogo.svg";

export default function Home() {
  const f1 = useRef(null);
  const f2 = useRef(null);
  const f3 = useRef(null);

  const f1InView = useInView(f1, { once: true });
  const f2InView = useInView(f2, { once: true });
  const f3InView = useInView(f3, { once: true });

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

        {/* <div className="features">
          <div ref={f1} className="feature-container">
            <motion.div
              className="feature-name green-text"
              initial={{ x: "-100vw" }}
              animate={{ x: f1InView ? 0 : "-100vw" }}
              transition={{
                type: "spring",
                stiffness: 50,
                delay: 0.3,
              }}
            >
              Orbital Controls
            </motion.div>

            <motion.div
              initial={{ x: "100vw" }}
              animate={{ x: f1InView ? 0 : "100vw" }}
              transition={{
                type: "spring",
                stiffness: 50,
                delay: 0.8,
              }}
              className="feature-description"
            >
              Grid is set up in a &nbsp;
              <span className="green-text bump-fontSize">
                3-Dimensional world. &nbsp;
              </span>
              You can use your mouse to &nbsp;
              <span className="cyan-text bump-fontSize">PAN </span>
              the scene.
              <span className="yellow-text bump-fontSize">
                &nbsp; ZOOM in &nbsp;
              </span>
              and
              <span className="yellow-text bump-fontSize">
                &nbsp; out &nbsp;
              </span>
              of the scene which is set up in
              <span className="cyan-text bump-fontSize">
                &nbsp; OUTER SPACE !
              </span>
            </motion.div>
          </div>

          <span className="divider"></span>

          <div ref={f2} className="feature-container">
            <motion.div
              initial={{ x: "-100vw" }}
              animate={{ x: f2InView ? 0 : "-100vw" }}
              transition={{
                type: "spring",
                stiffness: 50,
                delay: 0.8,
              }}
              className="feature-description"
            >
              Drawing over the maze again and again can be
              <span className="green-text bump-fontSize">
                &nbsp; CUMBERSOME ! &nbsp;
              </span>
              So You can use our
              <span className="yellow-text bump-fontSize">
                &nbsp; CUSTOM GENERATED &nbsp;
              </span>
              <span className="white-text bump-fontSize">MAZES ! &nbsp;</span>
              To generate your own
              <span className="cyan-text bump-fontSize"> MAZE</span>, &nbsp;
              hold the mouse and hover over the grid to see the
              <span className="green-text bump-fontSize">
                &nbsp; magic happen.
              </span>
            </motion.div>

            <motion.div
              className="feature-name cyan-text"
              style={{ textAlign: "end" }}
              initial={{ x: "100vw" }}
              animate={{ x: f2InView ? 0 : "100vw" }}
              transition={{
                type: "spring",
                stiffness: 50,
                bounce: 0.3,
                delay: 0.3,
              }}
            >
              Maze Generator
            </motion.div>
          </div>

          <span className="divider"></span>

          <div ref={f3} className="feature-container">
            <motion.div
              className="feature-name yellow-text"
              initial={{ x: "-100vw" }}
              animate={{ x: f3InView ? 0 : "-100vw" }}
              transition={{
                type: "spring",
                stiffness: 50,
                bounce: 0.3,
                delay: 0.3,
              }}
            >
              More Algorithms
            </motion.div>

            <motion.div
              initial={{ x: "100vw" }}
              animate={{ x: f3InView ? 0 : "100vw" }}
              transition={{
                type: "spring",
                stiffness: 50,
                delay: 0.8,
              }}
              className="feature-description"
            >
              Lots of different
              <span className="green-text bump-fontSize">
                &nbsp; Path finding algorithms &nbsp;
              </span>
              to visualize.&nbsp; Just select the
              <span className="white-text bump-fontSize">
                &nbsp; algorithm &nbsp;
              </span>
              from the options and see it reach the target in a
              <span className="cyan-text bump-fontSize">
                &nbsp; 3-dimensional grid.
              </span>
            </motion.div>
          </div>
        </div> */}

        {/* <div className="bttn-getStarted">get started</div> */}

        {/* <div className="redirectLinks">
          <div className="card">
            <div className="card-title">
              <div className="card-share">
                <IosShare fontSize="large" />
              </div>

              <div className="card-info">
                <div className="card-logo">
                  <LinkedIn />
                </div>

                <div className="card-heading">Linked In</div>
              </div>
            </div>

            <div className="card-divider"></div>

            <div className="card-description">Connect with me.</div>
          </div>

          <div className="card">
            <div className="card-title">
              <div className="card-logo"></div>
              <div className="card-info"></div>
            </div>

            <div className="card-description"></div>
          </div>
        </div>  */}
        <DeviceView />
        <div style={{ height: "1cm" }}></div>
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
