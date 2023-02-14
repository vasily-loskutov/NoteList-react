import { createSlice } from "@reduxjs/toolkit";
import noteServices from "../api/services/note.service";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    entities: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    noteRequested: (state) => {
      state.isLoading = true;
    },
    noteRequestFailed: (state, action) => {
      state.isLoading = false;

      state.error = action.payload;
    },
    created: (state, action) => {
      if (state.entities === null) {
        state.entities = [];
      }
      state.entities.push(action.payload);
      state.error = true;
    },
    removed: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    },
    recived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = true;
    },
    update: (state, action) => {
      const noteIndex = state.entities.findIndex(
        (u) => u._id === action.payload._id
      );
      state.entities[noteIndex] = action.payload;
    },
  },
});
const { actions, reducer: noteReducer } = noteSlice;
const { noteRequested, noteRequestFailed, created, removed, recived, update } =
  actions;
export const loadNote = () => async (dispatch) => {
  try {
    const content = await noteServices.get();

    dispatch(recived(content));
  } catch (error) {
    dispatch(noteRequestFailed(error.message));
  }
};
export const createNote = (payload) => async (dispatch) => {
  dispatch(noteRequested());
  try {
    const { data } = await noteServices.create(payload);
    dispatch(created(data));
  } catch (error) {
    dispatch(noteRequestFailed(error.message));
  }
};
export const removeNote = (id) => async (dispatch) => {
  dispatch(noteRequested());
  try {
    const { content } = await noteServices.remove(id);
    dispatch(removed(id));

    return content;
  } catch (error) {
    dispatch(noteRequestFailed(error.message));
  }
};
export const updateNote = (payload) => async (dispatch) => {
  try {
    const content = await noteServices.update(payload);

    dispatch(update(content));
  } catch (error) {
    dispatch(noteRequestFailed(error.message));
  }
};
export const noteIsLoading = () => (state) => {
  return state.note.isLoading;
};
export const getNotes = () => (state) => {
  return state.note.entities === null ? [] : state.note.entities;
};
export const getCurrentNote = (noteId) => (state) => {
  return state.note.entities.find((c) => c._id === noteId);
};
export default noteReducer;
