import React, { useState, useEffect } from "react";
import { Container } from "../../shared/ui/Wrapps";
import { AuthForm } from "../../entities";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, logIn } from "../../app/store/user";
const initialState = { email: "", password: "" };
const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector(getAuthError());

  const [data, setData] = useState(initialState);
  const [error, setErrors] = useState({});
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);
  const validateShema = yup.object().shape({
    password: yup
      .string()
      .required("Это поле обязательно для заполнения")
      .min(8, "Пароль слишком короткий — минимум 8 символов")
      .matches(/[a-zA-Z]/, "Пароль может содержать только латинские буквы"),
    email: yup
      .string()
      .required("это поле обязательно для заполнения")
      .email("Email введён не корректно"),
  });
  const validate = () => {
    validateShema
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => {
        setErrors({ [err.path]: err.message });
      });

    return Object.keys(error).length === 0;
  };

  const isValid = Object.keys(error).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    const newData = {
      ...data,
      notes: [],
    };
    setData(initialState);

    dispatch(logIn(newData, navigate));
  };
  return (
    <Container>
      <AuthForm
        titleText={"Войти"}
        btnText={"Войти "}
        isRegister={false}
        error={error}
        onChange={handleChange}
        data={data}
        onSubmit={handleSubmit}
        isValid={!isValid}
        authError={authError}
      />
    </Container>
  );
};
export default LogIn;
