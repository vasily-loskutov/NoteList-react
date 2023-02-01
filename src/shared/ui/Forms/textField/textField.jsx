import React from "react";
import PropTypes from "prop-types";

const TextField = ({
  name,
  value,
  type,
  erorr,
  onChange,
  placeHolder,
  isDisabled,
}) => {
  return (
    <input
      id={name}
      value={value}
      type={type}
      onChange={onChange}
      placeholder={placeHolder}
      className="inputStyle textField"
      disabled={isDisabled}
    />
  );
};
TextField.defaultProps = {
  type: "text",
};
TextField.PropTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
};
export default TextField;
