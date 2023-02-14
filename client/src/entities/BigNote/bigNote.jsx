import React from "react";
import Wrapper from "../../shared/ui/Wrapps";
import TextField, { TextAreaField } from "../../shared/ui/Forms";
import SimpleButton from "../../shared/ui/Buttons";

const BigNote = ({ onChange, onSubmit, data, error, inValid, textButton }) => {
  return (
    <>
      <form className="card-wrap" onSubmit={onSubmit}>
        <Wrapper>
          <div className="sizeCard">
            <div className="card-wrap-left">
              <div>
                <TextField
                  placeHolder={"Введите заголовок"}
                  onChange={onChange}
                  value={data.title}
                  name={"title"}
                  error={error.title}
                />
              </div>
              <div>
                <TextAreaField
                  placeHolder={"Введите текст заметки"}
                  onChange={onChange}
                  value={data.description}
                  name={"description"}
                  error={error.description}
                />
              </div>
            </div>
            <div className="card-wrap-right">
              <SimpleButton
                text={textButton}
                bgColor={"green"}
                disabled={inValid}
              />
            </div>
          </div>
        </Wrapper>
      </form>
    </>
  );
};

export default BigNote;
