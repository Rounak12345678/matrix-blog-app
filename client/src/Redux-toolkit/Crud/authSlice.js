import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { axiosInstance } from "../../Helper/Helper";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  isAuthenticated: !!parseCookies().token,
};

//

//signup api calling---------->


export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/users/signup", data);
      toast.success("Sign Up successful!");
      return res.data;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

//login api calling---------->

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/users/login", data);
      toast.success("Login successful!");
      return res;
    } catch (err) {
      toast.error(err.response.data.message || "Login failed. Please try again.");
      return rejectWithValue(err.response.data);
    }
  }
);


//creating slice for the apis---------->

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state,action) => {
      state.isAuthenticated = false;
      destroyCookie(null, "token", {
        path: "/",
      });
      destroyCookie(null, "user", {
        path: "/",
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        if (payload?.status === "success") {
          state.isAuthenticated = true;
          setCookie(null, "token", payload?.token, {
            path: "/",
          });
          setCookie(null, "user", JSON.stringify(payload?.data?.user), {
            path: "/",
          });
          state.status = "idle";
        }
        console.log(payload, "payload signup");
      })
      .addCase(signup.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          state.isAuthenticated = true;
          setCookie(null, "token", payload?.data?.token, {
            path: "/",
          });
          setCookie(null, "user", JSON.stringify(payload?.data?.data), {
            path: "/",
          });
          state.status = "idle";
        }
        console.log(payload, "payload login");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});
//logout function exporting------->

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
