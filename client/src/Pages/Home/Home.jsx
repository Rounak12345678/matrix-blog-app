import { Box, styled, Typography, Container } from "@mui/material";
import React from "react";
import corsImage from "../../assets/images/cors.png"

const HomeWrap = styled(Box)`


padding: 100px 0;
 
  display: flex;
  align-items: center;
  justify-content: center;
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
        <Box className="imp">
          <Typography variant="h3" color="initial">*Important Notes:-</Typography>
          <Typography variant="body1" color="initial">There will be cors error,to remove the cors error please download the chrome extension and enable it,then refresh the page</Typography>
          <img src={corsImage} alt="" />
        </Box>
      </Container>
    </HomeWrap>
  );
};

export default Home;
