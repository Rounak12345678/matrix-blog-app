import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_blog, getAllBlogs } from "../../Redux-toolkit/Crud/blogSlice";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { parseCookies } from "nookies";
import { BlogWrapper } from "../../StyledComponents/BlogWrapper";

export default function Allblogs() {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("latest");

  const isLoading = useSelector((s) => s.blog.status);



  const [mainList, setMainList] = useState([]);

  const blogList = useSelector((state) => state.blog.blogList);

    //setting the blog list-------->
  useEffect(() => {
    if (blogList?.length) {
      setMainList(blogList);
    }
  }, [blogList]);

  const { user: userString } = parseCookies();
  const user = JSON.parse(userString || "{}");

  //dispatching the getallblogs from redux------------------->

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  const navigate = useNavigate();


  //implementing delete functionallity only for that user------->

  const deleteBlog = (_id) => {
    const filterList = mainList.filter((_data, index) => _data?._id !== _id);

    setMainList(filterList);
    dispatch(delete_blog(_id)).then((data) => data && dispatch(getAllBlogs()));
    navigate("/blogs");
  };

  return (
    <BlogWrapper>
      <Container fixed>
        {isLoading !== "loading" ? (
          <Box className="main_div" sx={{ padding: "40px 0" }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              marginBottom={3}
              gap={2}
            >
              <Button component="a" href="/add-blog" variant="contained">
                Add Blog
              </Button>
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                size="small"
              >
                <MenuItem value="latest">Sort by Latest</MenuItem>
                <MenuItem value="oldest">Sort by Oldest</MenuItem>
              </Select>
            </Stack>

            <Grid container spacing={2}>
              {[...mainList]
                ?.sort((a, b) =>
                  sort === "latest"
                    ? moment(b?.createdAt).unix() - moment(a?.createdAt).unix()
                    : moment(a?.createdAt).unix() - moment(b?.createdAt).unix()
                )
                ?.map((data) => (
                  <Grid item xs={12} md={4} key={data._id}>
                    <Box
                      className="box"
                      border="1px solid #333"
                      padding={3}
                      borderRadius={4}
                    >
                      <Typography variant="h3" color="initial">
                        <Link to={`/blogs/${data?._id}`}>{data?.title}</Link>
                      </Typography>
                      <Typography variant="h6" color="initial">
                        {data?.content}
                      </Typography>
                      <Typography variant="subtitle1">
                        Author -{" "}
                        {data?.author?._id === user?._id
                          ? "You"
                          : data.author?.name || "Anonymous"}
                      </Typography>
                      <Button variant="contained" color="warning" disabled={data?.author?._id !== user?._id} onClick={() => deleteBlog(data?._id)}>
                        Delete
                      </Button>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Box>
        ) : (
          <Typography variant="body1" color="initial">
            loading..
          </Typography>
        )}
      </Container>
    </BlogWrapper>
  );
}
