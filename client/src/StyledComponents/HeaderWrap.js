import { Box, styled } from "@mui/material";

export const HeaderWrap = styled(Box)`
  .logo {
    font-size: 30px;
    color: white;
    margin-right: auto;
  }
  .hdr-list {
    display: flex;
    align-items: center;
    margin-left: auto;
    li {
      margin-right: 20px;
      width: auto;
      a {
        color: white;
        font-size: 16px;
        text-transform: capitalize;
      }
    }
  }
  .user{
    font-weight: 500;
    margin-left: 50px;
  }
`;
