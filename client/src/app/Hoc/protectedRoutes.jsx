import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { getIsLoggedIn } from "../store/user";

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const isLogged = useSelector(getIsLoggedIn());
  if (!isLogged) {
    return <Navigate to="/register" state={{ from: location }} />;
  }

  return children;
};
ProtectedRoutes.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default ProtectedRoutes;
