import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Container,
  Box,
  List,
  ListItem,
  Grid,
} from "@mui/material";
import { parseCookies } from "nookies";
import { useNavigate, useParams } from "react-router-dom";
import {
  addComment,
  delete_blog,
  getSingleBlog,
  updateSingleBlog,
} from "../../Redux-toolkit/Crud/blogSlice";
import { BlogWrapper } from "../../StyledComponents/BlogWrapper";

// Create a validation schema using yup
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

const commentSchema = yup.object().shape({
  content: yup.string().required("Comment is required"),
});

export default function Index() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [edit, setEdit] = useState(false);

  const singleBlog = useSelector((state) => state.blog.singleBlog);
  const state = useSelector((state) => state.blog.state);
  const { user: userString } = parseCookies();
  const user = JSON.parse(userString || "{}");


  //implementing react hook form here---------------->

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const {
    control: commentControl,
    handleSubmit: handleCommentSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });


//dispatching the singleblog from redux------------------->

  useEffect(() => {
    if (id) {
      dispatch(getSingleBlog(id));
    }
  }, [dispatch, id]);


  //setting the value if user wants to edit------------->
  useEffect(() => {
    if (singleBlog) {
      setValue("title", singleBlog.title);
      setValue("content", singleBlog.content);
    }
  }, [singleBlog, setValue]);

  const onHandleEdit = () => {
    setEdit(true);
  };

  //dispatching the updateblog from redux to update and then calling singleblog again------------------->

  const onSubmit = (data) => {
    if (id) {
      dispatch(updateSingleBlog({ id, data }))
        .unwrap()
        .then(() => {
          dispatch(getSingleBlog(id));
        });
      setEdit(false); // Exit edit mode after submitting
    }
  };

  //for showing comments------------------>

  const add_comment = (data) => {
    dispatch(
      addComment({
        id,
        data: {
          content: data.content,
          commenter: user._id,
          commenter_name: user.name,
        },
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getSingleBlog(id));
        reset();
      });
  };

  return (
    <BlogWrapper className="blog_details">
      <Container fixed>
        <Typography variant="h2" sx={{marginBottom:"30px",fontWeight:"600"}} color="initial">Blog Details</Typography>
        <hr />
        {!edit ? (
          <div>
            {state === "loading" ? (
              <div>Loading...</div>
            ) : (
              <div>
                <Box className="detls_top">
                  <Typography variant="h2">{singleBlog?.title}</Typography>
                  <Typography>{singleBlog?.content}</Typography>
                  {/* Add other blog details here */}
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Button
                      variant="contained"
                      onClick={onHandleEdit}
                      disabled={singleBlog?.author?._id !== user._id}
                    >
                      Edit
                    </Button>
                  </Stack>
                </Box>
                <hr />
                <h4 style={{ marginTop: 40, paddingInline: 10 }}>
                  Add Comments
                </h4>
                <form
                  onSubmit={handleCommentSubmit(add_comment)}
                  style={{ paddingInline: 10, marginBlock: 5 }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    className="cmnt_field"
                  >
                    <Controller
                      name="content"
                      control={commentControl}
                      render={({ field }) => <TextField {...field} />}
                    />
                    <Button variant="contained" color="info" type="submit">
                      Post
                    </Button>
                  </Stack>
                </form>
                <List>
                  {singleBlog?.comments
                    ?.slice()
                    .reverse()
                    .map((_comment) => {
                      return (
                        <ListItem
                          key={_comment._id}
                          style={{ marginBottom: 15 }}
                        >
                          <p style={{ marginBottom: 5 }}>{_comment?.content}</p>
                          <p style={{ fontWeight: "600" }}>
                            commented by -{" "}
                            {_comment.commenter_name || "Anonymous"}
                          </p>
                        </ListItem>
                      );
                    })}
                </List>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={{marginTop:"40px"}}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <p className="label">Title</p>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => <TextField {...field} />}
                />
                <p className="error">{errors.title?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <p className="label">Content</p>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <TextField multiline rows={3} {...field} />
                  )}
                />
                <p className="error">{errors.content?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" type="submit">
                  Update Blog
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Container>
    </BlogWrapper>
  );
}
