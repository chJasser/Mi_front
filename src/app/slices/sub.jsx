import { createSlice } from "@reduxjs/toolkit";
export const sub = createSlice({
  name: "sub",
  initialState: {
    subscribe: null,
  },
  reducers: {
    setSub: (state, action) => {
      state.subscribe = action.payload;
    },
  },
});

export const { setSub } = sub.actions;
export default sub.reducer;
