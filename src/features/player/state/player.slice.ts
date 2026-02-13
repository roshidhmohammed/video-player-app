import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { VideoContent } from '../../../shared/types';

interface VideoPlayerState {
    activeVideo: VideoContent | null;
    isMinimized: boolean;
    isPlaying: boolean;
    currentTime: number;
    isVisible: boolean;
}

const initialState: VideoPlayerState = {
    activeVideo: null,
    isMinimized: false,
    isPlaying: false,
    currentTime: 0,
    isVisible: false,
};

export const playerReducer = createSlice({
    name: 'player',
    initialState,
    reducers: {
        updateActiveVideo: (state, action: PayloadAction<VideoContent | null>) => {
            state.activeVideo = action.payload;
        },
        removeActiveVideo: (state) => {
            state.activeVideo = null;
        },
        updateIsMinimized: (state, action: PayloadAction<boolean>) => {
            state.isMinimized = action.payload;
        },
        updateIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        updateCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        }
    },
});

export const { 
    updateActiveVideo, 
    updateIsMinimized, 
    updateIsPlaying, 
    updateCurrentTime,
    removeActiveVideo
} = playerReducer.actions;

export default playerReducer.reducer;
