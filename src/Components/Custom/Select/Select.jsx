import { ArrowDropDown } from "@mui/icons-material";
import { useState } from "react";
import "./Styles.css";

export default function Select({ props }) {
  const { Label, queryName, Options } = props;

  const [value, setValue] = useState(null);

  const handleClick = (e) => {
    const label = document.querySelector(`.${queryName}-selectLabel`);
    const popper = document.querySelector(`.${queryName}-selectPopper`);

    const isOption = e.target.classList.contains("custom-selectOption");
    if (isOption) {
      const value = e.target.dataset.value;
      setValue(() => value);
      popper.classList.toggle("active-customSelectPopper");
      return;
    }

    if (!value) label.classList.toggle("active-customSelectLabel");
    popper.classList.toggle("active-customSelectPopper");
  };

  const onFocusLost = () => {
    const label = document.querySelector(`.${queryName}-selectLabel`);
    const popper = document.querySelector(`.${queryName}-selectPopper`);

    if (!value) label.classList.remove("active-customSelectLabel");
    popper.classList.remove("active-customSelectPopper");
  };

  return (
    <div
      className="custom-selectWrapper"
      onClick={handleClick}
      tabIndex={0}
      onBlur={onFocusLost}
    >
      <div className="custom-selectBox">
        <div className={`custom-selectLabel ${queryName}-selectLabel`}>
          {Label}
        </div>
        <div className="custom-selectValues">{value}</div>
        <ArrowDropDown />
      </div>
      <div className={`custom-selectPopper ${queryName}-selectPopper`}>
        {Options.map((opt, indx) => {
          return (
            <div data-value={opt} className="custom-selectOption" key={indx}>
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
}
