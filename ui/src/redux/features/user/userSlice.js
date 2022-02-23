import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        { email, password }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("isAdmin", data.userInfo.isAdmin);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/signup`,
        { email, password }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("isAdmin", data.userInfo.isAdmin);
      return data;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  token: localStorage.getItem("token"),
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")),
  status: null,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      state.token = null;
      state.isAdmin = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.token = action.payload.token;
      state.isAdmin = action.payload.userInfo.isAdmin;
      state.errorMessage = "";
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "fail";
      state.errorMessage = action.payload;
    },

    [registerUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.token = action.payload.token;
      state.isAdmin = action.payload.userInfo.isAdmin;
      state.errorMessage = "";
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "fail";
      state.errorMessage = action.payload;
    },
  },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
