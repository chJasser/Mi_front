import { createSlice } from "@reduxjs/toolkit";
export const CoursemodalSlice = createSlice({
  name: "CoursemodalSlice",
  initialState: {
    isOpen: false,
    isOpenResource: false,
    isOpenUpResource: false,
    isOpenChapter: false,
  },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setIsOpenResource: (state, action) => {
      state.isOpenResource = action.payload;
    },
    setIsOpenUpResource: (state, action) => {
      state.isOpenUpResource = action.payload;
    },
    setIsOpenChapter: (state, action) => {
      state.isOpenChapter = action.payload;
    },
  },
});

export const {
  setIsOpen,
  setIsOpenResource,
  setIsOpenChapter,
  setIsOpenUpResource,
} = CoursemodalSlice.actions;
export default CoursemodalSlice.reducer;
