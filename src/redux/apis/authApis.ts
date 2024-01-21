import { apiOperationMethods } from "../../constants/apiOperationMethods";
import { rootSplitApis } from "./rootSplitApis";

const authApi = rootSplitApis.injectEndpoints({
  endpoints: (builder) => ({
    userSignUp: builder.mutation({
      query: (data) => ({
        url: `auth/sign-up`,
        method: apiOperationMethods.POST,
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: `auth/login`,
        method: apiOperationMethods.POST,
        body: data,
      }),
    }),
  }),
});

export const { useUserSignUpMutation, useUserLoginMutation } = authApi;
