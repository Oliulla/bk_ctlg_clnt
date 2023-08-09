import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">
          <Link to="/">Book Catalog</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/all-books" className="text-white hover:underline">All Books</Link>
          </li>
          <li>
            <Link to="/sign-in" className="text-white hover:underline">Sign In</Link>
          </li>
          <li>
            <Link to="/sign-up" className="text-white hover:underline">Sign Up</Link>
          </li>
          <li>
            <button type='submit' className="bg-red-900 text-white px-2">Sign Out</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
