import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ placeHolder, isDisabled }) => {
  return (
    <textarea
      className="inputStyle textarea"
      placeholder={placeHolder}
      disabled={isDisabled}
    />
  );
};

export default TextAreaField;
