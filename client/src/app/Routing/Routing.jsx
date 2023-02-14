import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Notes, { Register, LogIn, PageNotFound } from "../../pages";
import AppLoader from "../Hoc/appLoader";
import ProtectedRoutes from "../Hoc/protectedRoutes";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/notes" />} />
      <Route
        path="notes/:noteId?"
        exact
        element={
          <ProtectedRoutes>
            <AppLoader>
              <Notes />
            </AppLoader>
          </ProtectedRoutes>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Routing;
