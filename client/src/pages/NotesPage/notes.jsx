import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditNote from "./editNote";
import NoteList from "./noteList";

const Notes = () => {
  const { noteId } = useParams();
  return <>{noteId ? <EditNote /> : <NoteList />}</>;
};

export default Notes;
