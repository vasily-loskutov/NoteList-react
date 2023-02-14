import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import AuthForm from "../../entities/AuthForm/authForm";
import { Container } from "../../shared/ui/Wrapps";
import { getAuthError, register } from "../../app/store/user";
import * as yup from "yup";
const initialState = { email: "", password: "" };
const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
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
    };

    dispatch(register(newData, navigate));
    setData(initialState);
  };

  return (
    <Container>
      <AuthForm
        titleText={"Зарегистрироваться"}
        btnText={"Зарегистрироваться"}
        isRegister={true}
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
export default Register;
