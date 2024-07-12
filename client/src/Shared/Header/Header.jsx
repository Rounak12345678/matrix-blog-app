import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux-toolkit/Crud/authSlice";
import { HeaderWrap } from "../../StyledComponents/HeaderWrap";
import { List, ListItem, Typography } from "@mui/material";
import { parseCookies } from "nookies";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to login page
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to sign up page
  };

  const isAuthenticated = useSelector((state) => state.crud.isAuthenticated);
  const dispatch = useDispatch();

//dispatching the logout function----->

  const handleLogout = () => {
    dispatch(logoutUser());
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    // You may also want to navigate away or perform other actions after logout
  };

  const navItems = [
    {
      name: "home",
      route: "/",
    },

    {
      name: "My Blogs",
      route: "/my-blogs",
    },
    {
      name: "All Blogs",
      route: "/blogs",
    },
  ];
  const location = useLocation();
  const [userName, setUserName] = useState(null);

  const cookies = parseCookies();
  useEffect(() => {
    const currentUser = cookies?.user;
  
    if (currentUser) {
  
        const user = JSON.parse(currentUser).name;
        setUserName(user);
    
    }
  }, [isAuthenticated]);

  return (
    <HeaderWrap>
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/" className="logo">
              Matrix
           
            </Link>
   
              <List className="hdr-list">
                {navItems.map((item) => (
                  <ListItem key={item.name} disablePadding>
                    <Link
                      to={item.route}
                      className={
                        location.pathname === item.route ? "active" : ""
                      }
                      aria-label="link"
                      rel="noreferrer"
                    >
                      {item.name}
                    </Link>
                  </ListItem>
                ))}
              </List>


              {isAuthenticated &&
              <Typography variant="body1" className="user">Hi {userName}</Typography>}
      

            {!isAuthenticated ? (
              <>
                <Button color="inherit" onClick={handleLoginClick}>
                  Login
                </Button>
                <Button
                  color="inherit"
                  style={{ marginLeft: "20px" }}
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                style={{ marginLeft: "20px" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </HeaderWrap>
  );
};
export default Header;
