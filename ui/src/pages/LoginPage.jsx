import React from "react";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../redux/features/user/userSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { errorMessage, isAdmin } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handlSubmit = (e) => {
    e.preventDefault();

    const userCred = { email, password };

    dispatch(loginUser(userCred));
    if (isAdmin) {
      navigate("/foodlist");
    } else {
      navigate("/home");
    }
  };
  return (
    <>
      <div className="sidenav">
        <div className="login-main-text">
          <h2>
            Calorie App
            <br /> Login Page
          </h2>
          <p>Login or register from here to access.</p>
        </div>
      </div>
      <div className="main">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            {errorMessage.message && (
              <Alert variant="danger">{errorMessage.message}</Alert>
            )}
            <form onSubmit={handlSubmit}>
              <div className="form-group mb-3">
                <label className="mb-3">Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label className="mb-3">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-black">
                Login
              </button>
              <Link to="/signup" className="btn btn-secondary ms-2">
                go to Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
