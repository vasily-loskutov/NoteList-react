import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNote } from "../store/note";
import { getIsLoggedIn, loadUsers } from "../store/user";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  useEffect(() => {
    dispatch(loadUsers());
    dispatch(loadNote());
  }, []);
  if (isLoggedIn) return children;
  return <h1>Loading</h1>;
};

export default AppLoader;
