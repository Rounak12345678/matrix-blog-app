import { Box, styled } from "@mui/material";

export const BlogWrapper = styled(Box)`
  h3 {
    a {
      &:hover {
        color: grey;
      }
    }
  }
  &.my_blogs {
    min-height: 100vh;
    padding: 50px 0;
  }
  &.add_blog {
    min-height: 100vh;
    padding: 50px 0;
    h1 {
      font-size: 50px;
      margin-bottom: 30px;
    }
    .error {
      margin-top: 10px;
      color: red;
    }
    .label {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    input,
    textarea {
      width: 100%;
    }
    .MuiFormControl-root {
      width: 100%;
    }
  }
  &.blog_details {
    padding: 100px;
    min-height: 100vh;
    .detls_top {
    
      padding: 40px 0;
      h2 {
        margin-bottom: 20px;
      }
      p {
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
    .cmnt_field {
      .MuiFormControl-root {
        width: 100%;
      }
    }
    ul {
      li {
        display: block;
        background-color: #f2f1f1;
      }
    }
    .label {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    input,
    textarea {
      width: 100%;
    }
    .MuiFormControl-root {
      width: 100%;
    }
  }
`;
