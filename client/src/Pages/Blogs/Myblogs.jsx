import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_blog, getAllBlogs } from "../../Redux-toolkit/Crud/blogSlice";
import { parseCookies } from "nookies";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { BlogWrapper } from "../../StyledComponents/BlogWrapper";
import { Box, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Myblogs() {
  const dispatch = useDispatch();
  const blogList = useSelector((state) => state.blog.blogList);

  //dispatching the getallblogs from redux------------------->

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  const [myBlogs, setMyBlogs] = useState([]);
  const cookies = parseCookies();

//if current user matches then only show his blogs

  useEffect(() => {
    if (blogList.length) {
      const currentUser = cookies?.user;
      if (currentUser) {
        const filterList = blogList.filter(
          (item) => item.author._id === JSON.parse(currentUser)._id
        );
        setMyBlogs(filterList);
        //   console.log(JSON.parse(currentUser)._id,"id")
      }
    }
  }, [blogList]);

  //if current user matches then delete

  const deleteBlog = (_id) => {
    const filterList = myBlogs.filter((_data, index) => _data?._id !== _id);

    setMyBlogs(filterList);
    dispatch(delete_blog(_id)).then((data) => data && dispatch(getAllBlogs()));
  
  };


  console.log(myBlogs, "myBlogs");

  return (
    <BlogWrapper className="my_blogs">
      <Container fixed>
        {myBlogs.length ? (
          <Grid container spacing={2}>
            {myBlogs?.map((item) => (
              <Grid item xs={12} md={4}>
                <Box
                  className="box"
                  border="1px solid #333"
                  padding={3}
                  borderRadius={4}
                >
                  <Typography variant="h3" color="initial">
                  <Link to={`/blogs/${item?._id}`}>{item?.title}</Link>
                
                  </Typography>
                  <Typography variant="h6" color="initial">
                    {item?.content}
                  </Typography>
                  <Button variant="contained" color="warning"   onClick={() => deleteBlog(item?._id)}>Delete</Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <Typography variant="h2" color="initial">
              No data found
            </Typography>
          </>
        )}
      </Container>
    </BlogWrapper>
  );
}
