import { createSlice } from "@reduxjs/toolkit";
import axios from "axiosInstance";
export const CourseSlice = createSlice({
  name: "CourseSlice",
  initialState: {
    change: false,
    selectedCourse: {
      label: "",
      price: "",
      duration: "",
      description: "",
      level: "",
      languages: "",
      category: "",
    },
  },
  reducers: {
    setChange: (state) => {
      state.change = !state.change;
    },
    setSelected: (state, action) => {
      state.selectedCourse = { ...action.payload };
    },
  },
});

export const { setChange, setSelected } = CourseSlice.actions;
export default CourseSlice.reducer;
