import { Link } from 'react-router-dom';
import { dummyBooks } from '../components/RecentBooks';

export default function AllBooks() {
  const genres = [...new Set(dummyBooks.map((book) => book.genre))];
  const publicationYears = [
    ...new Set(
      dummyBooks.map((book) => new Date(book.publicationDate).getFullYear())
    ),
  ];

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
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select Publications Year</option>
          {publicationYears.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dummyBooks.map((book, index) => (
        <Link to={`/book-details/${book.id}`} key={index}>
          <div className="bg-white p-4 rounded shadow-md cursor-pointer">
            <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">Author: {book.author}</p>
            <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
            <p className="text-gray-600">Publication Date: {book.publicationDate}</p>
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
