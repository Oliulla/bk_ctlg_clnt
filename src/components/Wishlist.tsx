const Wishlist = () => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">My Wishlist</h2>
      <ul className="list-disc pl-6">
        {/* Example book entry */}
        <li className="mb-2">
          <span className="font-semibold">Book Title</span> - Author Name (Wishlist)
          <div className="flex space-x-2 mt-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Start Reading
            </button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Finished Reading
            </button>
          </div>
        </li>
        {/* Repeat this structure for other books */}
      </ul>
    </div>
  );
};

export default Wishlist;
