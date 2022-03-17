import jwt_decode from "jwt-decode";
import { setAuthToken } from "axiosInstance";
import { createSlice } from "@reduxjs/toolkit";

const isEmpty = require("is-empty");
let initialState = {
  currentUser: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload);

      // Set token to Auth header
      setAuthToken(action.payload);
      // Decode token to get user data
      const decoded = jwt_decode(action.payload);
      state.currentUser = decoded;
      state.isAuthenticated = !isEmpty(decoded);
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isAuthenticated = !isEmpty(action.payload);
    },
    logoutUser(state) {
      localStorage.removeItem("token");
      state.currentUser = null;
      state.isAuthenticated = false;
      setAuthToken(false);
    },
  },
});
export const isAuthenticated = (state) => {
  return state.user.isAuthenticated;
};

export const { login, setCurrentUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
