import { apiOperationMethods } from "../../constants/apiOperationMethods";
import { tagTypes } from "../common/constants";
import { rootSplitApis } from "./rootSplitApis";

const booksApi = rootSplitApis.injectEndpoints({
  endpoints: (builder) => ({
    getRecentBooks: builder.query({
      query: () => `books/get-all-books`,
      providesTags: [tagTypes.BOOKS],
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
      providesTags: [tagTypes.BOOKS],
    }),
    getBookDetails: builder.query({
      query: (id) => `books/${id}`,
      providesTags: [tagTypes.BOOKS],
    }),
    addNewBook: builder.mutation({
      query: (data) => ({
        url: `books/create-book`,
        method: apiOperationMethods.POST,
        body: data,
      }),
    }),
    insertReveiw: builder.mutation({
      query: (reviewData) => ({
        url: `books/${reviewData.bookId}`,
        method: apiOperationMethods.POST,
        body: {
          user_email: reviewData?.user_email,
          comment: reviewData?.comment,
        },
      }),
      // Invalidate the cache for getBookDetails with the specified bookId
      invalidatesTags: [tagTypes.BOOKS],
    }),
    deleteABook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: apiOperationMethods.DELETE,
      }),
      invalidatesTags: [tagTypes.BOOKS],
    }),
  }),
});

export const {
  useGetRecentBooksQuery,
  useGetAllBooksQuery,
  useGetBookDetailsQuery,

  useAddNewBookMutation,
  useInsertReveiwMutation,

  useDeleteABookMutation,
} = booksApi;
