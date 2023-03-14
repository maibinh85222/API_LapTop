import React from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAstronaut } from "react-icons/fa";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "../../../../hooks/useAuth";

const Header = () => {
  const state = {
    dropdown: true,
    data: {
      user: "",
      photo: "",
      name: "",
      email: "",
    },
  };

  const navigate = useNavigate();
  const {auth, setAuth} = useAuth();

  const { dropdown, data } = state;

  const logoutHandler = () => {
    setAuth({});
    navigate("/signin");
  }

  return (
    <div className="header">
      <div className="title">
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to="/dashboard"
        >
          <span>e-Commerce</span>
        </Link>
      </div>
      <div className="admin">
        {/* <span onClick={dropdown}>{data.name} {dropdown ?  <i className="demo-icon icon-down-circle">&#xe810;</i> : <i className="demo-icon icon-up-circle">&#xe802;</i>  }</span> */}

        <div>
          {/* <img src={data.photo} alt="photo"/> */}
          <span className="name">{data.name}</span>
          <span className="email">{data.email}</span>
          <Link
            style={{ textDecoration: "none", marginTop: "20px" }}
            to="/admin"
          >
            <span
              style={{ padding: "5px 32px", backgroundColor: "#5D8EFB" }}
              className="logout"
            >
              <FaUserAstronaut />
              Account
            </span>
          </Link>
          <span className="logout" onClick={logoutHandler}>
            <LogoutIcon /> Logout
          </span>
        </div>
      </div>
    </div>
  );
};
export default Header;
