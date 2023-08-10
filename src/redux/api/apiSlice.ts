import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiOperationMethods } from "../../constants/apiOperationMethods";

// Define a service using a base URL and expected endpoints
export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getRecentBooks: builder.query({
      query: () => `books/get-all-books`,
      providesTags: ["books"],
    }),
    getAllBooks: builder.query({
      query: ({ dataLimit, searchTerm, genre, publication_date }) => {
        // console.log(dataLimit, searchTerm, genre, publication_date);
        let queryString = `books/get-all-books?page=1&limit=${dataLimit}`;

        if (searchTerm) {
          queryString += `&searchTerm=${searchTerm}`;
        }

        if (genre) {
          queryString += `&genre=${genre}`;
        }

        if (publication_date) {
          queryString += `&publication_date=${publication_date}`;
        }

        return queryString;
      },
      providesTags: ["books"],
    }),
    getBookDetails: builder.query({
      query: (id) => `books/${id}`,
    }),
    addNewBook: builder.mutation({
      query: (data) => ({
        url: `books/create-book`,
        method: apiOperationMethods.POST,
        body: data,
      }),
    }),
    deleteABook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: apiOperationMethods.DELETE,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetRecentBooksQuery,
  useGetAllBooksQuery,
  useGetBookDetailsQuery,
  useAddNewBookMutation,
  useDeleteABookMutation,
} = booksApi;
