import { createSlice } from "@reduxjs/toolkit";
export const CoursemodalSlice = createSlice({
  name: "CoursemodalSlice",
  initialState: {
    isOpen: false,
  },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = CoursemodalSlice.actions;
export default CoursemodalSlice.reducer;
