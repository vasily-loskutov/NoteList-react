import React from "react";
import PropTypes from "prop-types";

const SimpleButton = ({ text, bgColor, handleClick, disabled }) => {
  const isDisabled = () => {
    return disabled ? " disabled" : "";
  };
  return (
    <button
      className={"btn simpleBtn " + bgColor + isDisabled()}
      onClick={handleClick}
      disabled={disabled}>
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
