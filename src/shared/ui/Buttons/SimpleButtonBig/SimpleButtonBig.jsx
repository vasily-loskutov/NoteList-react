import React from "react";
import PropTypes from "prop-types";

const SimpleButtonBig = ({ text, bgColor }) => {
  return <button className={"btn simpleBtn big " + bgColor}>{text}</button>;
};
SimpleButtonBig.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
};
export default SimpleButtonBig;
