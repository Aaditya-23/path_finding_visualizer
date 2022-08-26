import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
  DoubleSide,
  GridHelper,
  Color,
  Vector2,
  Vector3,
  Raycaster,
  SphereGeometry,
  DirectionalLight,
  BoxGeometry,
  MeshPhongMaterial,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function loadDis() {
  return <div>Fuck me</div>;
}

export default function RenderShit() {
  useEffect(() => {
    const canvas = document.querySelector(".Visulaizer");
    // canvas.appendChild(loadDis);

    // const renderer = new WebGLRenderer({ canvas, alpha: true });

    // renderer.setSize(window.innerWidth, window.innerHeight);

    // const Visualizer = document.querySelector(".Visulaizer");
    // Visualizer.appendChild(renderer.domElement);

    // const scene = new Scene();
    // scene.background = new Color("#ffffff");
    // const camera = new PerspectiveCamera(
    //   45,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );

    // camera.position.set(10, 15, -22);

    // function animate() {
    //   renderer.render(scene, camera);
    // }

    // renderer.setAnimationLoop(animate);

    // return () => {
    //   Visualizer.removeChild(renderer.domElement);
    // };
    console.log(canvas);
  }, []);

  return (
    <div
      className="Visulaizer"
      style={{
        color: "white",
      }}
    >
      {/* <Canvas className="customShit">
        <mesh>
          <planeGeometry />
          <meshBasicMaterial color="red" />
        </mesh>
      </Canvas> */}
    </div>
  );
}

// useEffect(() => {
//   const renderer = new WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);

//   const Visualizer = document.querySelector(".Visulaizer");
//   Visualizer.appendChild(renderer.domElement);

//   let isMouseDown = false;

//   const scene = new Scene();
//   scene.background = new Color("#ffffff");
//   const camera = new PerspectiveCamera(
//     45,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );

//   const orbit = new OrbitControls(camera, renderer.domElement);
//   camera.position.set(10, 15, -22);

//   orbit.update();

//   const planeMesh = new Mesh(
//     new PlaneGeometry(20, 20),
//     new MeshBasicMaterial({
//       color: "#1A76D3",
//       side: DoubleSide,
//       visible: false,
//     })
//   );

//   planeMesh.rotateX(-Math.PI / 2);
//   planeMesh.name = "ground";

//   const highlightMesh = new Mesh(
//     new PlaneGeometry(1, 1),
//     new MeshBasicMaterial({
//       color: "pink",
//       side: DoubleSide,
//     })
//   );

//   highlightMesh.rotateX(-Math.PI / 2);

//   const sphereMesh = new Mesh(
//     new SphereGeometry(0.4, 4, 2),
//     new MeshBasicMaterial({
//       wireframe: true,
//       color: "red",
//     })
//   );

//   const grid = new GridHelper(20, 20, "#1DD31A", "#1DD31A");
//   grid.addEventListener("click", () => {
//     console.log("finally");
//   });

//   grid.dispatchEvent({ type: "click" });

//   const mousePosition = new Vector2();
//   const raycaster = new Raycaster();
//   let intersects;

function mouseMove(e) {
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mousePosition, camera);
  intersects = raycaster.intersectObjects(scene.children);
  intersects.forEach(function (intersect) {
    if (intersect.object.name === "ground" && isMouseDown) {
      const position = new Vector3()
        .copy(intersect.point)
        .floor()
        .addScalar(0.5);
      //   highlightMesh.position.set(position.x, 0, position.z);

      const sphere = sphereMesh.clone();
      sphere.position.copy(position);
      scene.add(sphere);

      orbit.enabled = false;
    }
  });
}

//   scene.add(grid);
//   scene.add(highlightMesh);
//   scene.add(planeMesh);

//   window.addEventListener("mousemove", mouseMove);
//   window.addEventListener("mousedown", () => (isMouseDown = true));
//   window.addEventListener("mouseup", () => {
//     isMouseDown = false;
//     orbit.enabled = true;
//   });

//   function animate() {
//     renderer.render(scene, camera);
//   }

//   renderer.setAnimationLoop(animate);

//   return () => {
//     Visualizer.removeChild(renderer.domElement);
//   };
// }, []);
