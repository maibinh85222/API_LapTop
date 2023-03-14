// import PropTypes from 'prop-types'
// import Button from './Button'
import { useLocation } from "react-router-dom"; // to get the routing location
import * as React from "react";
// import ReactDOM from 'react-dom';
import { Avatar } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiTwotoneHome } from "react-icons/ai";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
// import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
// import DirectionsIcon from '@mui/icons-material/Directions';
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Dropdown from "./components/dropdown/Dropdown";
import Dropbutton from "./components/dropdown/Dropdown";
import BasicExample from "./components/dropdown/Dropdown";

// import {
//     Badge
//   } from "@mui/material";

const MarketHeader = (props) => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // access location

  const signoutHandler = async () => {
    setAuth({});
    navigate("/signin");
  };

  console.log("Auth la " + auth.roles + auth.accessToken);

  return (
    <>
      {!location.pathname.includes("admin") ? (
        <header className="header">
          <Grid container spacing={2}>
            <Grid item xs={0.5} />

            <Grid item xs={2} style={{ marginTop: "1.0rem" }}>
              <Link to="/" style={{ color: "#FFFFFF", fontSize: "20px" }}>
                Bamboo Store
              </Link>
            </Grid>

            <Grid
              item
              xs={5}
              style={{ marginTop: "0.5rem", marginRight: "1.5rem" }}
            >
              <Paper
                component="form"
                sx={{ p: "0px 4px", display: "flex", alignItems: "center" }}
              >
                <FormGroup style={{ backgroundColor: "#F3F3F3" }}>
                  <FormControlLabel
                    control={
                      <Checkbox defaultChecked style={{ marginLeft: "1rem" }} />
                    }
                    label="Tìm kiếm"
                  />
                </FormGroup>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Tìm kiếm sản phẩm"
                  inputProps={{ "aria-label": "search item or seller" }}
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>

            {!auth.roles && (
              <Grid item xs={0.8} style={{ marginTop: "1.0rem" }}>
                <Link
                  className="headerLink"
                  to="/signin"
                  style={{ fontSize: "16px" }}
                >
                  Sign In
                </Link>
              </Grid>
            )}

            {!auth.roles && (
              <Grid item xs={0.8} style={{ marginTop: "1.0rem" }}>
                <Link
                  className="headerLink"
                  to="/signup"
                  style={{ fontSize: "16px" }}
                >
                  Sign Up
                </Link>
              </Grid>
            )}

            {auth.roles && (
              <Grid item xs={0.8} style={{ marginTop: "1.0rem" }}>
                <Link
                  className="headerLink"
                  to="/signin" onClick={signoutHandler}
                  style={{ fontSize: "16px" }}
                >
                  Sign out
                </Link>
              </Grid>
            )}

            

            <Grid item xs={0.7} style={{ marginTop: "1.0rem" }}>
              <Link
                className="headerLink"
                to="/cart"
                style={{ fontSize: "16px" }}
              >
                <AiOutlineShoppingCart />
                Cart
              </Link>
            </Grid>

            {/* <Grid item xs={0.5} style={{ marginTop: "0.5rem" }}>
              <Avatar
                alt="Remy Sharp"
                src="http://cheng-bing.top/wp-content/uploads/2020/12/20200811_083412415_iOS.png"
              />
            </Grid> */}

            <BasicExample />

          </Grid>
        </header>
      ) : (
        ""
      )}
    </>
  );
};

export default MarketHeader;
