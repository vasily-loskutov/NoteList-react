import React from "react";
import PropTypes from "prop-types";

const AuthField = ({
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
        className={"inputStyle auth" + isError()}
        disabled={isDisabled}
      />
      {error && <p className="isInValid">{error}</p>}
    </>
  );
};

export default React.memo(AuthField);
