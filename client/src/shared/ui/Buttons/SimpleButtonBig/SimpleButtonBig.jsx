import React from "react";
import PropTypes from "prop-types";

const SimpleButtonBig = ({ text, bgColor, disabled }) => {
  const isDisabled = () => {
    return disabled ? " disabled" : "";
  };
  return (
    <button
      className={"btn simpleBtn big " + bgColor + isDisabled()}
      disabled={disabled}>
      {text}
    </button>
  );
};
SimpleButtonBig.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
};
export default React.memo(SimpleButtonBig);
