import React from "react";
import PropTypes from "prop-types";

const SimpleButton = ({ text, bgColor, handleClick }) => {
  return (
    <button className={"btn simpleBtn " + bgColor} onClick={handleClick}>
      {text}
    </button>
  );
};
SimpleButton.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  handleClick: PropTypes.func,
};
export default SimpleButton;
