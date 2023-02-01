import React from "react";
import "./exitButton.scss";
import "../button.scss";
const ExitButton = ({ text }) => {
  return <button className="btn exitBtn blue  ">{text}</button>;
};

export default ExitButton;
