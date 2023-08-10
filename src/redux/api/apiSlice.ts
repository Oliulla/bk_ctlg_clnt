import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  endpoints: (builder) => ({
    getRecentBooks: builder.query({
      query: () => `books/get-all-books`,
    }),
    getAllBooks: builder.query({
      query: ({ dataLimit, searchTerm, genre, publication_date }) => {
        console.log(dataLimit, searchTerm, genre, publication_date);
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
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRecentBooksQuery, useGetAllBooksQuery } = booksApi;
