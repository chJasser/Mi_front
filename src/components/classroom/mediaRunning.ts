import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
export interface ResourceAudioRunningState {
  resourceData?: any;
  state?: "loading" | "playing" | "paused" | "ended" | null;
  listResourceAudio?: any[];
}

const initialState: ResourceAudioRunningState = {};

export const mediaRunningSlice = createSlice({
  name: "resourceRunning",
  initialState,
  reducers: {
    changeCurrentMediaRunning: (
      state,
      action: PayloadAction<ResourceAudioRunningState>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeStateMediaRunning: (
      state,
      action: PayloadAction<ResourceAudioRunningState["state"]>
    ) => {
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
    addNewListPostAudio: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        listPostAudio: [...(state.listResourceAudio || []), action.payload],
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
} = mediaRunningSlice.actions;

export const selectCurrentMedia = (state: RootState) => state.mediaRunning;

export default mediaRunningSlice.reducer;
