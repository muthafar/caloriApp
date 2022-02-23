import React from "react";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/features/user/userSlice";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { token, errorMessage } = useSelector((state) => state.user);
  const handlSubmit = (e) => {
    e.preventDefault();

    const userCred = { email, password };

    dispatch(registerUser(userCred));
    if (token) {
      navigate("/home");
    } else {
      navigate("/signup");
    }
  };
  return (
    <>
      <div className="sidenav">
        <div className="login-main-text">
          <h2>
            Calorie App
            <br /> Register Page
          </h2>
          <p> register from here to access.</p>
        </div>
      </div>
      <div className="main">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
              <Link to="/login" className="btn btn-black">
                Back to Login
              </Link>
              <button type="submit" className="btn btn-secondary ms-2">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
