import React from "react";
import PropTypes from "prop-types";

const ExitButton = ({ text, handleClick }) => {
  return (
    <button className="btn exitBtn blue  " onClick={handleClick}>
      {text}
    </button>
  );
};
ExitButton.propTypes = {
  text: PropTypes.string,
};
export default ExitButton;
