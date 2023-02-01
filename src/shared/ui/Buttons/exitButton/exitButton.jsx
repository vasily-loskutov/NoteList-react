import React from "react";
import PropTypes from "prop-types";

const ExitButton = ({ text }) => {
  return <button className="btn exitBtn blue  ">{text}</button>;
};
ExitButton.propTypes = {
  text: PropTypes.string,
};
export default ExitButton;
