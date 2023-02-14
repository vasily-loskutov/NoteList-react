import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentNote, updateNote } from "../../app/store/note";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../shared/ui/Wrapps";
import * as yup from "yup";
import { ExitButton } from "../../shared/ui/Buttons";
import BigCard from "../../entities/BigNote/bigNote";
const initialState = { title: "", description: "" };
export const EditNotes = () => {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const navigate = useNavigate();

  const currentNote = useSelector(getCurrentNote(noteId));

  const [data, setData] = useState(initialState);
  const [error, setErrors] = useState({});
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    if (currentNote) {
      setData({ ...currentNote });
    }
  }, [currentNote]);
  useEffect(() => {
    validate();
  }, [data]);
  const validateShema = yup.object().shape({
    description: yup.string().required("это поле обязательно для ввода"),
    title: yup.string().required("это поле обязательно для ввода"),
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

    dispatch(updateNote(data));
    navigate(-1);
  };
  return (
    <Container>
      <div className="cardUpdate">
        <ExitButton text={"Выйти"} handleClick={() => navigate(-1)} />
        <BigCard
          onChange={handleChange}
          onSubmit={handleSubmit}
          data={data}
          error={error}
          inValid={!isValid}
          textButton={"Обновить"}
        />
      </div>
    </Container>
  );
};
export default EditNotes;
