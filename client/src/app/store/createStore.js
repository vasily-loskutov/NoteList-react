import { combineReducers, configureStore } from "@reduxjs/toolkit";
import noteReducer from "./note";
import userReducer from "./user";

const rootReducer = combineReducers({
  note: noteReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
export default store;
