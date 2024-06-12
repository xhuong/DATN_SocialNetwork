import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { PostAPI } from "@/services/PostAPI";
import { LikeAPI } from "@/services/LikeAPI";
import { CommentAPI } from "@/services/CommentAPI";
import { AuthenticationAPI } from "@/services/AuthenticationAPI";
import modal from "@/redux/slices/modal";

const rootReducer = combineReducers({
  modal: modal,
  [AuthenticationAPI.reducerPath]: AuthenticationAPI.reducer,
  [PostAPI.reducerPath]: PostAPI.reducer,
  [LikeAPI.reducerPath]: LikeAPI.reducer,
  [CommentAPI.reducerPath]: CommentAPI.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare()
      .concat(AuthenticationAPI.middleware)
      .concat(PostAPI.middleware)
      .concat(LikeAPI.middleware)
      .concat(CommentAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
