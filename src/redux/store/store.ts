import { configureStore } from "@reduxjs/toolkit";
import { rootSplitApis } from "../apis/rootSplitApis";
// import bookReducer from "./features/books/bookSlice";
import authSlice from "../authSlice/authSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [rootSplitApis.reducerPath]: rootSplitApis.reducer,
    authSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootSplitApis.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
