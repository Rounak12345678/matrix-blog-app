import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../Crud/authSlice";
import { blogSlice } from "../Crud/blogSlice";

export const store = configureStore({
  reducer: {
    crud: authSlice.reducer,
    blog: blogSlice.reducer,
  },
});
