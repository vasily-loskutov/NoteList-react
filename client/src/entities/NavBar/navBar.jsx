import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../app/store/user";
import { Container } from "../../shared/ui/Wrapps";
import NavProfile from "../NavProfile/navProfile";

const NavBar = () => {
  const currentUser = useSelector(getCurrentUser());

  return (
    <Container>
      <nav className="container-wrapper">
        <h1 className="logo">NOTE LIST</h1>
        {currentUser ? (
          <NavProfile />
        ) : (
          <div className="loginGroup">
            <Link to="/register">
              <h1>Зарегистрироваться </h1>
            </Link>
            <Link to="/logIn">
              <h1>Войти </h1>
            </Link>{" "}
          </div>
        )}
      </nav>
    </Container>
  );
};

export default NavBar;
