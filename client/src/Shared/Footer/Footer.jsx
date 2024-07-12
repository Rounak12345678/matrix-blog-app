/* eslint-disable no-console */

import styled from "@emotion/styled";
import { List, ListItem } from "@mui/material";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { useLocation,Link } from "react-router-dom";


const FooterWrap = styled(Box)`

  background-color: black;
  padding: 50px 0;

  .ftr-list {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    margin-top: 30px;

    li {
      width: auto;
      margin-right: 30px;

      &:last-child {
        margin-right: 0;
      }
      a {
        font-weight: 400;
        font-size: 18px;
        color: white;
        text-transform: capitalize;
        &:hover {
          color: gray;
        }
        &.active {
          color: gray;
        }
      }
    }
  }
  .ftr-logo {
    font-size: 30px;
    color: white;
    text-decoration: none;
  }

  .copy {
    padding-top: 40px;
    border-top: 1px solid #565656;
    margin-top: 40px;
    font-size: 18px;
    color: #c2c2c2;

    a {
      color: #c2c2c2;
      &:hover {
        color: white;
      }
    }
  }
  .ftr-wrapper{
    text-align: center;
  }
`;



const Footer = () => {
  const navItems= [
    {
      name: "home",
      route: "/"
    },

    {
      name: "My Blogs",
      route: "/my-blogs"
    },
    {
      name: "All Blogs",
      route: "/blogs"
    },
 
  ];

  const location = useLocation();

  return (
    <FooterWrap className="footer_wraper">
      <Container fixed>
        <Box className="ftr-wrapper">
          <Link to="/" className="ftr-logo" aria-label="link" rel="noreferrer">
            Matrix Media
          </Link>

          <List className="ftr-list">
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <Link
                  to={item.route}
                  className={location.pathname === item.route ? "active" : ""}
                  aria-label="link"
                  rel="noreferrer"
                >
                  {item.name}
                </Link>
              </ListItem>
            ))}
          </List>

          <Box className="copy">
            © 2024 <Link to="/">Rounak</Link>
          </Box>
        </Box>
      </Container>
    </FooterWrap>
  );
};

export default Footer;

/* ©2024 Hava */
