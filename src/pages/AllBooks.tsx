import { Link } from "react-router-dom";
// import { dummyBooks } from '../components/RecentBooks';
import {
  useGetAllBooksQuery,
  useGetRecentBooksQuery,
} from "../redux/api/apiSlice";
import Loading from "../components/ui/Loading";
import { IBooks } from "../types/globalTypes";

export default function AllBooks() {
  const { data: recentBooks } = useGetRecentBooksQuery(undefined);
  const books = recentBooks?.data;

  // const genres = [
  //   ...new Set(books?.map((book: { genre: string }) => book.genre)),
  // ];

  const genres = books?.map((book: { genre: string; }) => book.genre)

  const publicationYears = books?.map((book: { publication_date: string; }) => book.publication_date.split("T00")[0])

  


  const { data, isLoading, isError } = useGetAllBooksQuery(
    recentBooks?.meta?.total
  );
  const allBooks = data?.data;

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return "Something went wrong";
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">All Books</h1>

      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by title, author, or genre"
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
        </button>
      </div>

      <div className="flex flex-col md:flex-row mb-4 space-y-4 md:space-y-0 md:space-x-4">
        <select className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select Genre</option>
          {genres?.map((genre: string, index: number) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select Publications Year</option>
          {publicationYears?.map((year: string, index: number) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allBooks.map((book: IBooks) => (
          <Link to={`/book-details/${book._id}`} key={book._id}>
            <div className="bg-white p-4 rounded shadow-md cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-2">Author: {book.author}</p>
              <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
              <p className="text-gray-600">
                Publication Date: {book.publication_date.split("T00")[0]}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-end my-10 mr-10">
        <Link
          to="/add-new-book"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New
        </Link>
      </div>
    </div>
  );
}
