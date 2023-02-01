import SimpleButton, { SimpleButtonBig, ExitButton } from "../shared/Buttons";
import React from "react";

function App() {
  const handleClick = () => {
    console.log(11);
  };
  return (
    <>
      <SimpleButton
        text={"Добавить"}
        bgColor={"green"}
        handleClick={handleClick}
      />{" "}
      <SimpleButtonBig text={"Удалить"} bgColor={"red"} />
      <ExitButton text={"Выйти"} />
    </>
  );
}

export default App;
