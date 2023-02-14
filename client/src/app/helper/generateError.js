const generateError = (message) => {
  switch (message) {
    case "EMAIL_EXIST":
      return "данный email уже существует";

    case "INVALID_DATA":
      return "пароль или email введены некорректно";

    case "INVALID_PASSWORD":
      return "неверный пароль";
    case "EMAIL_NOT_FOUND":
      return "email не найден";
    default:
      break;
  }
};
export default generateError;
