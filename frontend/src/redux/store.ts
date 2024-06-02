import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import loadingSlice from "@/redux/slices/loading";
import cartSlice from "@/redux/slices/cart";

import { BookAPI } from "@/services/BookAPI";
import { OrderAPI } from "@/services/OrderAPI";
import { PublisherAPI } from "@/services/PublisherAPI";
import { AuthorAPI } from "@/services/AuthorAPI";

const rootReducer = combineReducers({
  cart: cartSlice,
  loading: loadingSlice,
  [BookAPI.reducerPath]: BookAPI.reducer,
  [OrderAPI.reducerPath]: OrderAPI.reducer,
  [AuthorAPI.reducerPath]: AuthorAPI.reducer,
  [PublisherAPI.reducerPath]: PublisherAPI.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare()
      .concat(BookAPI.middleware)
      .concat(AuthorAPI.middleware)
      .concat(PublisherAPI.middleware)
      .concat(OrderAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
