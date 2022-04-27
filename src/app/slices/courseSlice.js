import { createSlice } from "@reduxjs/toolkit";
import axios from "axiosInstance";
export const CourseSlice = createSlice({
  name: "CourseSlice",
  initialState: {
    changeResource: false,
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
    resources: [],
    chapter: { _id: 0, description: "", title: "" },
    selectedResource: null,
  },
  reducers: {
    setChange: (state) => {
      state.change = !state.change;
    },
    setChangeResource: (state) => {
      state.changeResource = !state.changeResource;
    },
    setSelected: (state, action) => {
      state.selectedCourse = { ...action.payload };
    },
    setresources: (state, action) => {
      state.resources = action.payload;
    },
    setChapter: (state, action) => {
      state.chapter = action.payload;
    },
    setSelectedResource: (state, action) => {
      state.selectedResource = action.payload;
    },
  },
});

export const {
  setChange,
  setSelected,
  setresources,
  setChapter,
  setChangeResource,
  setSelectedResource,
} = CourseSlice.actions;
export default CourseSlice.reducer;
