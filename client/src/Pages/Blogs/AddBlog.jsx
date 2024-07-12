import React from "react";
import { useDispatch } from "react-redux";
import CreateBlogForm from "../../Components/CreateBlogForm/CreateBlogForm";
import { createBlog } from "../../Redux-toolkit/Crud/blogSlice";
import { useNavigate } from "react-router-dom";
import { BlogWrapper } from "../../StyledComponents/BlogWrapper";
import Container from "@mui/material/Container";

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

//dispatching the createblog from redux------------------->

  const onSubmit = (formData) => {
    dispatch(createBlog(formData))
      .unwrap()
      .then(() => navigate("/blogs"));
  };

  return (
    <BlogWrapper className="add_blog">
      <Container fixed>
        <h1>Create Your Own Blog</h1>
        <CreateBlogForm onSubmit={onSubmit} />
      </Container>
    </BlogWrapper>
  );
};

export default AddBlog;
