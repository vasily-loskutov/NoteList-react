import React, { useState } from "react";
import { AuthField } from "../../shared/ui/Forms";
import { SimpleButtonBig } from "../../shared/ui/Buttons";
import { Link } from "react-router-dom";
const AuthForm = ({
  titleText,
  btnText,
  isRegister,
  error,
  onChange,
  data,
  onSubmit,
  isValid,
  authError,
}) => {
  const [password, setPassword] = useState("password");
  const togglePassword = () => {
    return password === "password" ? "-slash" : "";
  };
  return (
    <>
      <form className="authForm" onSubmit={onSubmit}>
        <h1 className="authTitle">{titleText}</h1>
        <div className="authForm-fields">
          <div>
            <AuthField
              placeHolder="Введите ваш email"
              error={error.email}
              onChange={onChange}
              value={data.email}
              name={"email"}
            />
          </div>
          <div style={{ position: "relative" }}>
            <AuthField
              placeHolder="Введите ваш пароль"
              error={error.password}
              onChange={onChange}
              value={data.password}
              name={"password"}
              type={password}
            />

            <button
              className="togglePassword"
              type="button"
              onClick={() =>
                password === "text"
                  ? setPassword("password")
                  : setPassword("text")
              }>
              <i className={"bi  bi-eye" + togglePassword()}></i>
            </button>
          </div>
          {authError && <p className="isInValid bigError">{authError}</p>}
        </div>
        <div className="btn-wrapp">
          <SimpleButtonBig
            text={btnText}
            bgColor={"green"}
            disabled={isValid}
          />
        </div>
        {isRegister ? (
          <p>
            У вас есть аккаунт?{" "}
            <Link to="/logIn">
              <span style={{ textDecoration: "underline", color: "black" }}>
                Войти
              </span>
            </Link>
          </p>
        ) : (
          <p>
            У вас нет аккаунта?{" "}
            <Link to="/register">
              <span style={{ textDecoration: "underline", color: "black" }}>
                Зарегистрироваться
              </span>
            </Link>
          </p>
        )}
      </form>
    </>
  );
};

export default AuthForm;
