import React from "react";
import "./simpleButtonBig.scss";
import "../button.scss";
const SimpleButtonBig = ({ text, bgColor }) => {
  return <button className={"btn simpleBtn big " + bgColor}>{text}</button>;
};

export default SimpleButtonBig;
