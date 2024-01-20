import { useGetRecentBooksQuery } from "../redux/apis/booksApi";
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
