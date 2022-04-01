import { createSlice } from "@reduxjs/toolkit";
export const filterCourseSlice = createSlice({
  name: "filter",
  initialState: {
    marque: null,
    category: null,
    language: null,
  },
  reducers: {
    filterByMarque: (state, action) => {
      state.marque = action.payload;
    },
    filterByCategory: (state, action) => {
      state.category = action.payload;
    },
    filterByLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { filterByMarque, filterByCategory, filterByLanguage } =
  filterCourseSlice.actions;
export default filterCourseSlice.reducer;
