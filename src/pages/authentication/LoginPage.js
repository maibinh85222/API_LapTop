import { useData } from "../../context/DataContext";
import TextInput from "../../components/forms/TextInput";
import AsyncButton from "../../components/buttons/AsyncButton";
import { Link, useLocation } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import "../../styles/Auth.css";
import React, { useContext, useEffect, useState } from "react";
import AuthenticateUserService from "../../api/authentication/AuthenticateUserService";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LoadingSpinner from "../../components/LoadingSpinner";
const LoginPage = (props) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const { productList } = useData();

  const location = useLocation();

  console.log("Value product login " + JSON.stringify(productList));

  useEffect(() => {
    if (auth?.accessToken && auth.roles) {
      console.log("Da vao useEffect");
      navigate("/");
    }
  }, []);

  const [state, setState] = useState({
    username: "",
    password: "",
    isLoading: false,
    message: "",
  });

  const { username, password, isLoading, message } = state;

  const onChangeHandler = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setState({ ...state, isLoading: true });
    const response = await AuthenticateUserService(username, password).then(
      (res) => res.data
    );

    console.log("response  " + JSON.stringify(response));

    if (response.errorCode) {
      setState({ ...state, message: response.data });
    } else {
      // console.log("Data auth is " + resData.headers["authorization"].split(' ')[1] + " and ");
      console.log("res " + JSON.stringify(response));
      console.log("Value " + response.jwtToken + " " + response.role);

      window.localStorage.setItem("authorization", response.jwtToken);

      window.localStorage.setItem("role", response.role);
      setState({ ...state, isLoading: false });
      if (response.role === "ADMIN") {
        console.log("Da vao admin");

        // call setAuth -> useEffect sử dụng object để set object vào localStorage bởi vì auth state
        // sẽ null mỗi lần reload page
        setAuth({ roles: response.role, accessToken: response.jwtToken });
        navigate("/manage/products");
      } else {
        setAuth({ roles: response.role, accessToken: response.jwtToken });
        
        // state - the re-direct path.  "?" to check if the state object exists before attempting to access the from property
        const from = location.state?.from;
        navigate(from || "/");
      }
    }
  };

  return (
    <div className="form-box text-center p-5 m-5 mx-auto bg-light">
      <form className="form-signin" onSubmit={submitHandler}>
        <h1 className="form-title h3 mb-5 font-weight-normal">Đăng nhập</h1>
        <div style={{ color: "red" }}> {message ? message : ""}</div>
        <TextInput
          name="username"
          value={username}
          label="Username*"
          type="text"
          required
          //   errors={errors}
          onChange={onChangeHandler}
        />
        <TextInput
          name="password"
          value={password}
          label="Password*"
          type="password"
          required
          //   errors={errors}
          onChange={onChangeHandler}
        />

        <div className="my-4">
          <p>
            Bạn chưa có tài khoản, đăng ký{" "}
            <Link style={{ fontWeight: "400" }} to="/register">
              đây
            </Link>
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner asOverlay />
        ) : (
          <AsyncButton
            type="submit"
            text="Đăng nhập"
            className="primary-button btn-lg rounded-pill mt-10 py-10 px-4"
          />
        )}
      </form>
    </div>
  );
};

export default LoginPage;
