import { useEffect } from "react";
import "./Styles.css"

export default function Tooltip({ props }) {
  const { container, content } = props;

  useEffect(() => {
    const targetContainer = document.querySelector(`${container}`);

    const showTooltip = (e) => {
      console.log(e.target.getBoundingClientRect());
    };

    const hideTooltip = (e) => {};

    targetContainer.addEventListener("mouseenter", showTooltip);
    targetContainer.addEventListener("mouseleave", hideTooltip);

    return () => {
      targetContainer.removeEventListener("mouseenter", showTooltip);
      targetContainer.removeEventListener("mouseLeave", hideTooltip);
    };
  }, []);

  return <div className="custom-tooltip">{content}</div>;
}
