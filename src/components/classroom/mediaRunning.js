import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const ResourceAudioRunningState = createSlice({
  name: "ResourceAudioRunningState",
  initialState: {
    state: null,
    listResourceAudio: [],
    resourceData: null,
  },
  reducers: {
    changeCurrentMediaRunning: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeStateMediaRunning: (state, action) => {
      return {
        ...state,
        state: action.payload,
      };
    },
    removeMediaRunning: (state) => {
      return {
        listResourceAudio: state.listResourceAudio,
      };
    },
    //
    addNewListPostAudio: (state, action) => {
      return {
        ...state,
        listResourceAudio: [...(state.listResourceAudio || []), action.payload],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeCurrentMediaRunning,
  changeStateMediaRunning,
  removeMediaRunning,
  addNewListPostAudio,
} = ResourceAudioRunningState.actions;

export default ResourceAudioRunningState.reducer;
