import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCurrentUser, logout } from "../../app/store/user";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUser());
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="loginGroup">
      <h1>{currentUser.email} </h1>
      <a onClick={() => dispatch(logout({ navigate }))} className="logOut-btn">
        Выйти
      </a>
    </div>
  );
};

export default NavProfile;
