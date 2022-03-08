import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  token: "",
  errors: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      console.log(action.payload);
      state.token = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});

export const { setErrors, login } = userSlice.actions;
export default userSlice.reducer;
