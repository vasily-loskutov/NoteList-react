import React from "react";
import Wrapper from "../../shared/ui/Wrapps";
import TextField, { TextAreaField } from "../../shared/ui/Forms";
import SimpleButton from "../../shared/ui/Buttons";

const CreatingCard = () => {
  return (
    <>
      <Wrapper>
        <div className="card-wrap">
          <div className="card-wrap-left">
            <TextField placeHolder={"Введите заголовок"} />
            <TextAreaField placeHolder={"Введите текст заметки"} />
          </div>
          <div className="card-wrap-right">
            <SimpleButton text={"Добавить"} bgColor={"green"} />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default CreatingCard;
