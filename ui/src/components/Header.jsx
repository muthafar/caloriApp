import React from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../redux/features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="header d-flex justify-content-between">
      <h1 className="text-white">Calorie App </h1>
      <Link
        to="/login"
        className="btn text-white"
        onClick={() => {
          dispatch(signOut());
        }}
      >
        Sign Out
      </Link>
    </div>
  );
};

export default Header;
