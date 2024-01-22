import useAuthEmail from "../hooks/useAuthEmail";
import { useGetAllBooksQuery } from "../redux/apis/booksApi";
import Loader from "./ui/__Loader/__Loader";

const Wishlist = () => {
  // To get all books assign all required props as empty string ("")
  const { data, isLoading } = useGetAllBooksQuery({
    searchTerm: "",
    genre: "",
    publication_date: "",
  });
  const currentUserEmail = useAuthEmail();

  // Books
  const books = data?.data;

  if (isLoading) {
    return <Loader />;
  }

  // console.log(data, isLoading, isError);
  const userWishListBooks = books.filter((book: any) =>
    book.wishlist.some((wish: any) => wish.reader_email === currentUserEmail)
  );

  // console.log(userWishListBooks);

  return (
    <div className="bg-white p-4 rounded min-h-screen">
      {userWishListBooks?.length > 0 ? (
        <div>
          {" "}
          <h2 className="text-2xl font-semibold mb-4">My Wishlist</h2>
          <ul className="list-disc px-6">
            {userWishListBooks.map((book: any) => (
              <li className="mb-2 shadow-2xl">
                <span className="font-semibold">{book?.title}</span> -{" "}
                <span>{book?.author}</span>
                <span> (Wishlist)</span>
                <div className="flex space-x-2 mt-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Start Reading
                  </button>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Finished Reading
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-2xl font-semibold mb-4">
          You don't have any book in wishlist
        </p>
      )}
    </div>
  );
};

export default Wishlist;
