import Navbar from "../Navbar/Navbar";
import DeviceView from "./DeviceView";
import RotatingHomeGrid from "./RotatingHomeGrid";
import "./Styles.css";

export default function Home() {
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

        <DeviceView />
        <div style={{ height: "1cm" }}></div>
      </main>
    </>
  );
}
