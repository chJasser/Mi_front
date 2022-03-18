import jwt_decode from "jwt-decode";
import { setAuthToken } from "axiosInstance";
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

const isEmpty = require("is-empty");
let initialState = {
  currentUser: null,
  currentTeacher: null,
  currentSeller: null,
  currentStudent: null,
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
      // window.location.reload();
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isAuthenticated = !isEmpty(action.payload);
    },
    setCurrentSeller(state, action) {
      state.currentSeller = action.payload;
    },
    setCurrentStudent(state, action) {
      state.currentStudent = action.payload;
    },
    setCurrentTeacher(state, action) {
      state.currentTeacher = action.payload;
    },
    logoutUser(state) {
      localStorage.removeItem("token");
      state.currentUser = null;
      state.isAuthenticated = false;
      setAuthToken(false);
      window.location.href = "/";
    },
  },
});
export const userRoles = (state) => {
  if (state.user.currentUser == null) {
    return [];
  }
  return state.user.currentUser.user_role;
};

export const userId = (state) => {
  if (state.user.currentUser == null) {
    return null;
  }
  return state.user.currentUser._id;
};

export const currentUser = (state) => {
  if (state.user.currentUser == null) {
    return null;
  }
  return state.user.currentUser;
};

export const isAuthenticated = (state) => {
  return state.user.isAuthenticated;
};

export const getCurrentSeller = () => (dispatch) => {
  axios
    .get("/sellers/getcurrentseller")
    .then((response) => {
      dispatch(setCurrentSeller(response.data.seller));
    })
    .catch((error) => {
      dispatch(setCurrentSeller(null));
    });
};
export const getCurrentStudent = () => (dispatch) => {
  axios
    .get("/students/getcurrentstudent")
    .then((response) => {
      dispatch(setCurrentStudent(response.data.student));
    })
    .catch((error) => {
      dispatch(setCurrentStudent(null));
    });
};

export const getCurrentTeacher = () => (dispatch) => {
  axios
    .get("/teachers/getcurrentteacher")
    .then((response) => {
      dispatch(setCurrentTeacher(response.data.teacher));
    })
    .catch((error) => {
      dispatch(setCurrentTeacher(null));
    });
};

export const {
  login,
  setCurrentUser,
  logoutUser,
  setCurrentSeller,
  setCurrentStudent,
  setCurrentTeacher,
} = userSlice.actions;
export default userSlice.reducer;
