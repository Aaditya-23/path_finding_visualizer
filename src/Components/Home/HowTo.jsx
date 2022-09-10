export default function HowTo() {
  const material = [
    {
      heading: "Walkthrough",
      writeUp:
        'Let\'s start with the starting and ending nodes. To select a starting point, click on the "select source button" and then click on the node that you wish to have it as a starting node. Do the same to select the target node by clicking on the "select target button".',
    },
    {
      heading: "select an algorithm",
      writeUp:
        "Click on the algorithm dropdown menu to select the current algorithm to visualize.",
    },

    {
      heading: "Model",
      writeUp:
        "Choose what object do you want to drop on the node. A Pillar would restrict the path and would not allow us to pass through it. On the other hand, a Bomb would cost more to pass through it but it does not restrict the path and allows us to pass through it.",
    },

    {
      heading: "clear grid",
      writeUp:
        'To clear the current path from the source node to the target node, click on the "clear path" button. This will not erase the source node and target node and neither will this remove any Pillar or Bomb on the grid Click on the "clear everything" button to remove the Pillars and Bombs from the grid This will also remove the source and target nodes. ',
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

              {index === 0 && (
                <>
                  <div
                    style={{ marginTop: "0.5rem" }}
                    className="content-description"
                  >
                    Furthermore, moving through a node costs 1 and moving
                    through a bomb costs 5 times more than moving through a
                    node. You cannot pass through a Pillar. Possible movements
                    from the current nodes are :-
                    <ul style={{ listStyle: "number" }}>
                      <li>Up</li>
                      <li>Down</li>
                      <li>Left</li>
                      <li>Right</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
      <div className="container-wrapper">
        <div className="content-heading">Extras</div>
        <div className="content-description">
          <ul style={{ listStyle: "number" }}>
            <li>
              Change the speed of VISUALIZATION by selecting the speed from the
              dropdown menu.
            </li>

            <li>Change grid Dimensions.</li>

            <li>Select a maze pattern to generate it (optional)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
