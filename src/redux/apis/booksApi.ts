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
    addUserWishlist: builder.mutation({
      query: ({ bookId, readerEmail }) => ({
        url: `books/wishlist/${bookId}&${readerEmail}`,
        method: apiOperationMethods.POST,
      }),
      // Invalidate the cache for getBookDetails with the specified id
      invalidatesTags: [tagTypes.BOOKS],
    }),
    changeBookReadingStatus: builder.mutation({
      query: ({ bookId, readerEmail, status }) => ({
        url: `books/wishlist/status/${bookId}&${readerEmail}`,
        method: apiOperationMethods.POST,
        body: { status },
      }),
      // Invalidate the cache for getBookDetails with the specified id
      invalidatesTags: [tagTypes.BOOKS],
    }),
    updateABook: builder.mutation({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: apiOperationMethods.PATCH,
        body: data,
      }),
      // Invalidate the cache for getBookDetails with the specified id
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
  useAddUserWishlistMutation,
  useChangeBookReadingStatusMutation,

  useUpdateABookMutation,

  useDeleteABookMutation,
} = booksApi;
