import React from "react";
import { useNavigate } from "react-router-dom";
import SimpleButton from "../../shared/ui/Buttons";
import TextField, { TextAreaField } from "../../shared/ui/Forms";
import Wrapper from "../../shared/ui/Wrapps";

const Note = ({ card, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="card-wrapper">
        <TextField isDisabled={true} value={card.title} />
        <TextAreaField isDisabled={true} value={card.description} />
        <SimpleButton
          text={"Обновить"}
          bgColor={"green"}
          handleClick={() => navigate(`${card._id}`)}
        />
        <SimpleButton
          text={"Удалить"}
          bgColor={"red"}
          handleClick={() => {
            handleDelete(card._id);
          }}
        />
      </div>
    </Wrapper>
  );
};

export default Note;
