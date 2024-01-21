import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { tagTypes } from "../common/constants";
import { RootState } from "../store/store";

const baseUrl = import.meta.env.VITE_APP_BASE_API_URL;

export const rootSplitApis = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.token;

      if (token) {
        headers.set("authorization", `${token}`);
      }

      return headers;
    },
    credentials: "include",
  }) as BaseQueryFn,

  tagTypes: [tagTypes.BOOKS, tagTypes.USERS, tagTypes.AUTH],
  endpoints: () => ({}),
});
