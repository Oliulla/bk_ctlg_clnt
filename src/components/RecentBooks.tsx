export const dummyBooks = [
  {
    id: 10,
    title: "Book 1",
    author: "Author 1",
    genre: "Genre 1",
    publicationDate: "2023-08-01",
  },
  {
    id: 11,
    title: "Book 2",
    author: "Author 2",
    genre: "Genre 2",
    publicationDate: "2023-07-15",
  },
  {
    id: 12,
    title: "Book 3",
    author: "Author 3",
    genre: "Genre 3",
    publicationDate: "2023-06-20",
  },
  {
    id: 13,
    title: "Book 4",
    author: "Author 4",
    genre: "Genre 4",
    publicationDate: "2023-05-10",
  },
  {
    id: 14,
    title: "Book 5",
    author: "Author 5",
    genre: "Genre 5",
    publicationDate: "2023-04-05",
  },
  {
    id: 15,
    title: "Book 6",
    author: "Author 6",
    genre: "Genre 6",
    publicationDate: "2023-03-15",
  },
  {
    id: 16,
    title: "Book 7",
    author: "Author 7",
    genre: "Genre 7",
    publicationDate: "2023-02-28",
  },
  {
    id: 17,
    title: "Book 8",
    author: "Author 8",
    genre: "Genre 8",
    publicationDate: "2023-01-20",
  },
  {
    id: 18,
    title: "Book 9",
    author: "Author 9",
    genre: "Genre 9",
    publicationDate: "2022-12-10",
  },
  {
    id: 19,
    title: "Book 10",
    author: "Author 10",
    genre: "Genre 10",
    publicationDate: "2022-11-05",
  },
];

import { useGetRecentBooksQuery } from "../redux/api/apiSlice";
import { IBooks } from "../types/globalTypes";
import Loading from "./ui/Loading";

export default function RecentBooks() {
  const { data, isLoading, isError } = useGetRecentBooksQuery(undefined);
  const books = data?.data;

  // console.log(isLoading, error)

  // console.log(books[0].publication_date.split('T00')[0])

  return (
    <>
      {isError ? (
        <h3>Something went wrong!!!</h3>
      ) : (
        <>
          {isLoading ? (
           <Loading />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books?.map((book: IBooks) => (
                  <div
                    key={book._id}
                    className="bg-white p-4 rounded shadow-md"
                  >
                    <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                    <p className="text-gray-600 mb-2">Author: {book.author}</p>
                    <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
                    <p className="text-gray-600">
                      Publication Date: {book.publication_date.split("T00")[0]}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
