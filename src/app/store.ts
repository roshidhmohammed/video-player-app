import { configureStore } from '@reduxjs/toolkit';
import videoReducer from '../shared/slices/video.slice';
import categoryReducer from '../shared/slices/category.slice';
import  playerReducer  from '../features/player/state/player.slice';

// import playerReducer from '../slices/videoPlayerSlice';

export const store = configureStore({
  reducer: {
    video: videoReducer,
    category: categoryReducer,
    player: playerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
