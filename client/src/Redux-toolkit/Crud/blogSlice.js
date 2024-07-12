import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Helper/Helper";
import { toast } from "react-toastify";

let initialState = {
  status: "idle",
  blogList: [],
  singleBlog: null,
};

//calling createblog api---------->

export const createBlog = createAsyncThunk("createBlog", async (data) => {
  try {
    const res = await axiosInstance.post("/blogs", data);
    toast.success("blog successfully created");
    return res;
  } catch (err) {

    throw err;
  }
});

//calling allblogs api---------->

export const getAllBlogs = createAsyncThunk("allBlogs", async () => {
  try {
    const res = await axiosInstance.get(`/blogs`);
    return res;
  } catch (err) {
    throw err;
  }
});

//calling singleBlog api---------->

export const getSingleBlog = createAsyncThunk("singleBlog", async (data) => {
  try {
    const res = await axiosInstance.get(`/blogs/${data}`);
    return res;
  } catch (err) {
    throw err;
  }
});

//calling updateBlog api---------->

export const updateSingleBlog = createAsyncThunk(
  "updateBlog",
  async ({ id, data }) => {
    try {
      const res = await axiosInstance.put(`/blogs/${id}`, data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

//calling deleteblog api---------->

export const delete_blog = createAsyncThunk("delete_blog", async (id) => {
  try {
    const res = await axiosInstance.delete(`/blogs/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
});

//calling addCommnet api---------->

export const addComment = createAsyncThunk(
  "addComment",
  async ({ id, data }) => {
    try {
      const res = await axiosInstance.post(`/comments/${id}`, data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

//creating slice for the apis---------->

export const blogSlice = createSlice({
  name: "Category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBlog.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.status === 200) {
          state.blogList = [...state.blogList, payload.data?.data?.newPost];
        }
      })
      .addCase(createBlog.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(getAllBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBlogs.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.status === 200) {
          state.blogList = payload.data?.data?.post;
        }
      })
      .addCase(getAllBlogs.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(getSingleBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleBlog.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.status === 200) {
          state.singleBlog = payload.data?.data?.post;
        }
      })
      .addCase(getSingleBlog.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(updateSingleBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSingleBlog.fulfilled, (state, { payload }) => {
        state.status = "idle";

        if (payload.status === 200) {
          state.singleBlog = payload.data?.data?.updatedPost;
        }
      })
      .addCase(updateSingleBlog.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(delete_blog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(delete_blog.fulfilled, (state, { payload }) => {
        state.status = "idle";
        // if (payload.status === 200) {

        //   state.singleBlog = payload.data?.data?.post;
        // }
      })
      .addCase(delete_blog.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.status = "idle";
        // if (payload.status === 200) {

        //   state.singleBlog = payload.data?.data?.post;
        // }
      })
      .addCase(addComment.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export default blogSlice.reducer;
