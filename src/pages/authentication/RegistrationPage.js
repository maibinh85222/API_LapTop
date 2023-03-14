import TextInput from "../../components/forms/TextInput";
import AsyncButton from "../../components/buttons/AsyncButton";
import { Link } from "react-router-dom";
import "../../styles/Auth.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registrationService } from "../../api/authentication/AuthenticateUserService";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: "",
  });

  const { username, email, password, confirmPassword, message } = state;

  const onChangeHandler = (event) => {
    console.log("Da vao Change Handler");
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = { username, email, password };
    try {
      const response = await registrationService(formData).then(
        (res) => res.data
      );
      if (!response.errorCode) {
        navigate("/signin");
      } else {
        setState({ ...state, message: response.data });
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div className="form-box text-center p-5 m-5 mx-auto bg-light">
      <title> Sign up</title>
      <form className="form-signin" onSubmit={submitHandler}>
        <h1 className="form-title h3 mb-2 font-weight-normal">
          Đăng ký tài khoản
        </h1>

        <div style={{ color: "red" }}> {message ? message : ""}</div>

        <TextInput
          name="username"
          value={username}
          label="Tên đăng nhập*"
          type="text"
          onChange={onChangeHandler}
        />

        <TextInput
          name="email"
          value={email}
          label="Email*"
          type="email"
          required
          onChange={onChangeHandler}
        />
        <TextInput
          name="password"
          value={password}
          label="Mật khẩu*"
          type="password"
          required
          onChange={onChangeHandler}
        />
        <TextInput
          name="confirmPassword"
          value={confirmPassword}
          label="Xác nhận mật khẩu*"
          type="password"
          required
          onChange={onChangeHandler}
        />

        <div className="my-4">
          <p>
            Bạn đã có tài khoản. Đăng nhập{" "}
            <Link style={{ fontWeight: "400" }} to="/signin">
              ở đây
            </Link>{" "}
          </p>
        </div>

        <AsyncButton
          type="submit"
          text="Đăng ký"
          className="primary-button btn-lg rounded-pill mt-1 py-2 px-4"
          // loading={loading}
          // disabled={!username || !email || !password || !confirmPassword}
        />
      </form>
    </div>
  );
};

export default RegistrationPage;
