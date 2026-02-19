import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CategoryData } from "../types";

interface VideoState {
  suggestionVideos: CategoryData[];
}

const initialState: VideoState = {
  suggestionVideos: [],
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    selectedCategoryVideos: (state, action: PayloadAction<CategoryData[]>) => {
      state.suggestionVideos = action.payload;
    },
  },
});

export const { selectedCategoryVideos } = videoSlice.actions;

export default videoSlice.reducer;
