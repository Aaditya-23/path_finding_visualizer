export default function Features() {
  const material = [
    {
      heading: "orbital controls",
      writeUp:
        "Grid is set up in a 3-Dimensional world. You can use\
         your mouse to PAN the scene ZOOM in and out",
    },
    {
      heading: "Custom Maze Generator",
      writeUp: " ",
    },
  ];

  return (
    <div className="content-wrapper">
      {material.map((item, index) => {
        return (
          <div key={index} className="container-wrapper">
            <div className="content-heading">{item.heading}</div>
            <div className="content-description">{item.writeUp}</div>
          </div>
        );
      })}
    </div>
  );
}
