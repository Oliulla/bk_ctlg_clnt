// import { apiOperationMethods } from "../../constants/apiOperationMethods";
import { rootSplitApis } from "./rootSplitApis";

const userApi = rootSplitApis.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUserByEmail: builder.query({
      query: ({ email }) => `user/${email}`,
    }),
  }),
});

export const { useGetSingleUserByEmailQuery } = userApi;
