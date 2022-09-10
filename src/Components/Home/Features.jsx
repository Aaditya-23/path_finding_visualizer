import { Link } from "react-router-dom";

export default function Features() {
  const material = [
    {
      heading: "orbital controls",
      writeUp:
        "Grid is set up in a 3-Dimensional world. You can use your mouse to rotate around the scene, ZOOM in and out. To PAN the scene press and hold the ctrl/cmd button and then press and hold the mouse and move the mouse to see the magic happen.",
    },
    {
      heading: "Custom Maze Generator",
      writeUp:
        "Generating maze patterns again and again can be exhaustive even if its not, We've got some custom super-interesting maze patterns. Head over to maze generator dropdown menu and select your maze pattern and VISUALIZE!",
    },

    {
      heading: "Dynamic Grid Size",
      writeUp:
        "You can change the size of the grid from the dropdown menu. Currently we have 3 dimensions available :-",
    },

    {
      heading: "Mesh Animations",
      writeUp:
        "Clean mesh animations to visualize the whole process in a correct way. You can control the speed of the whole process by selecting the speed from the speed dropdown menu.",
    },
    {
      heading: "more algorithms to visualize",
      writeUp:
        "We have a descent collection of algorithms to visualize. And a whole lot of algorithms would be added in the future. To read about the algorithms that we currently have ",
    },
  ];

  return (
    <div className="content-wrapper">
      {material.map((item, index) => {
        return (
          <div key={index} className="container-wrapper">
            <div className="content-heading">{item.heading}</div>
            <div className="content-description">
              {item.writeUp}
              {index === 2 && (
                <ul style={{ listStyle: "number" }}>
                  <li>20X20</li>
                  <li>30X30</li>
                  <li>40X40</li>
                </ul>
              )}
              {index === 4 && (
                <Link to="/algorithms" style={{ color: "deepskyblue" }}>
                  head here.
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
