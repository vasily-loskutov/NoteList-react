import React, { useEffect, useState } from "react";
import BigNote, { Note, Pagination } from "../../entities";
import { Container } from "../../shared/ui/Wrapps";
import * as yup from "yup";
import _ from "lodash";
import {
  noteIsLoading,
  createNote,
  getNotes,
  removeNote,
} from "../../app/store/note";
import { useDispatch, useSelector } from "react-redux";

const initialState = { title: "", description: "" };
const NoteList = () => {
  const dispatch = useDispatch();
  const cards = useSelector(getNotes());

  const reverseCards = _.reverse([...cards]);

  const isLoading = useSelector(noteIsLoading());

  const [data, setData] = useState(initialState);
  const [error, setErrors] = useState({});

  const validateShema = yup.object().shape({
    description: yup.string().required("это поле обязательно для ввода"),
    title: yup.string().required("это поле обязательно для ввода"),
  });
  const cardCount = cards.length;
  const pageSize = 4;

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const paginate = (cards, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;

    return [...cards].splice(startIndex, pageSize);
  };
  const prev = () => {
    return currentPage <= 1 ? 1 : setCurrentPage((prevState) => prevState - 1);
  };
  const next = (pagesLength) => {
    return currentPage === pagesLength
      ? setCurrentPage(currentPage)
      : setCurrentPage((prevState) => prevState + 1);
  };
  const cardsCrop = paginate(reverseCards, currentPage, pageSize);

  if (cardsCrop.length === 0 && currentPage > 1) {
    setCurrentPage((prevState) => prevState - 1);
  }
  useEffect(() => {
    validate();
  }, [data]);
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

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    const newData = { ...data };
    dispatch(createNote(newData));
    setData(initialState);
  };

  const handleDelete = (id) => {
    dispatch(removeNote(id));
  };

  return (
    <Container>
      <BigNote
        onChange={handleChange}
        onSubmit={handleSubmit}
        data={data}
        error={error}
        inValid={!isValid}
        textButton={"Добавить"}
      />

      <div className="cards">
        {isLoading
          ? cardCount > 0
            ? cardsCrop.map((card) => {
                return (
                  <Note
                    card={card}
                    key={card._id}
                    handleDelete={handleDelete}
                  />
                );
              })
            : "Заметок нет"
          : "Loading"}
      </div>
      <Pagination
        itemsCount={cardCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        prev={prev}
        next={next}
      />
    </Container>
  );
};

export default NoteList;
