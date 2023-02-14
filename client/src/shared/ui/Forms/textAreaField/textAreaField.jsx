import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
  onChange,
  placeHolder,
  isDisabled,
  name,
  value,
  error,
}) => {
  const isError = () => {
    return error ? " inValidForm" : "";
  };
  return (
    <>
      <textarea
        className={"inputStyle textarea" + isError()}
        placeholder={placeHolder}
        disabled={isDisabled}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
      {error && <p className="isInValid">{error}</p>}
    </>
  );
};
TextAreaField.defaultProps = {
  type: "text",
};
TextAreaField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  placeHolder: PropTypes.string,
  isDisabled: PropTypes.bool,
};
export default TextAreaField;
