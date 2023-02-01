import React from "react";
import "./simpleButton.scss";
import "../button.scss";
const SimpleButton = ({ text, bgColor, handleClick }) => {
  return (
    <button className={"btn simpleBtn " + bgColor} onClick={handleClick}>
      {text}
    </button>
  );
};

export default SimpleButton;
