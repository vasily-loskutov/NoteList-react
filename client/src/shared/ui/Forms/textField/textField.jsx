import React from "react";
import PropTypes from "prop-types";

const TextField = ({
  name,
  value,
  type,
  error,
  onChange,
  placeHolder,
  isDisabled,
}) => {
  const isError = () => {
    return error ? " inValidForm" : "";
  };
  return (
    <>
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeHolder}
        className={"inputStyle textField" + isError()}
        disabled={isDisabled}
      />
      {error && <p className="isInValid">{error}</p>}
    </>
  );
};
TextField.defaultProps = {
  type: "text",
};
TextField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  placeHolder: PropTypes.string,
  isDisabled: PropTypes.bool,
};
export default TextField;
