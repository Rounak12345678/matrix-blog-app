import { Box, styled, Typography, Container } from "@mui/material";
import React from "react";
import corsImage from "../../assets/images/cors.png"

const HomeWrap = styled(Box)`


padding: 100px 0;
 
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  h1 {
    font-size: 50px;
    font-weight: 700;
    margin-bottom: 25px;
    color: black;
  }
  h3 {
    font-size: 20px;
  }
  .imp{
    margin-top: 60px;
    h3{
      color: red;
    }
    img{
      height: 500px;
    }
    p{
      margin-bottom: 10px;
    }
  }
`;

const Home = () => {
  return (
    <HomeWrap>
      <Container fixed>
        <Typography variant="h1">Welcome to my blog website</Typography>
        <Typography variant="h3">
          I have linked the pages in header and footer.User can
          update,edit,delete their own posts
        </Typography>
      </Container>
    </HomeWrap>
  );
};

export default Home;
