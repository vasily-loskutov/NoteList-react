import React from "react";
import SimpleButton from "../../shared/ui/Buttons";
import TextField, { TextAreaField } from "../../shared/ui/Forms";
import Wrapper from "../../shared/ui/Wrapps";

const Card = () => {
  return (
    <Wrapper>
      <div className="card-wrapper">
        <TextField isDisabled={true} />
        <TextAreaField isDisabled={true} />
        <SimpleButton text={"Обновить"} bgColor={"green"} />
        <SimpleButton text={"Удалить"} bgColor={"red"} />
      </div>
    </Wrapper>
  );
};

export default Card;
