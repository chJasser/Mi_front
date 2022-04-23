import { createSlice } from "@reduxjs/toolkit";
export const CoursemodalSlice = createSlice({
  name: "CoursemodalSlice",
  initialState: {
    isOpen: false,
    isOpenResource: false,
  },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setIsOpenResource: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen, setIsOpenResource } = CoursemodalSlice.actions;
export default CoursemodalSlice.reducer;
