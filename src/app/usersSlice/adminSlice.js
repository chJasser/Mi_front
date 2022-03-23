import { createSlice } from "@reduxjs/toolkit";
import axios from "axiosInstance";
let initialState = {
  users: [],
};

const UsersSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    getUsers(state, action) {
      state.users = action.payload;
    },
    removeUser: (state, action) => {
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    },
    blockUser: (state, action) => {
      state.users.forEach((user) => {
        if (user._id === action.payload) {
          user.isBlocked = true;
        }
      });
    },
  },
});
export const getAllUsers = () => (dispatch) => {
  axios
    .get("/users")
    .then((response) => {
      dispatch(getUsers(response.data));
    })
    .catch((err) => {
      dispatch(console.log(err));
    });
};
export const { getUsers, updateUsersList, removeUser, blockUser } =
  UsersSlice.actions;
export default UsersSlice.reducer;
