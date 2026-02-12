import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './slices/videoSlice';
import categoryReducer from './slices/categorySlice';

import playerReducer from './slices/videoPlayerSlice';

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
