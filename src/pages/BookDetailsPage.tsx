import { useParams, Link, useNavigate } from "react-router-dom";

import Loading from "../components/ui/Loading";
import { toast } from "react-toastify";
import {
  useAddUserWishlistMutation,
  useDeleteABookMutation,
  useGetBookDetailsQuery,
} from "../redux/apis/booksApi";
import useAuthEmail from "../hooks/useAuthEmail";
import SubmitReviewForm from "../components/__SubmitReviewForm/__SubmitReviewForm";
import useAuthToken from "../hooks/useAuthToken";
import LoadingButton from "../components/ui/__Loader/__LoadingButton";

export default function BookDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUserEmail = useAuthEmail();
  const token = useAuthToken();

  const { data, isLoading } = useGetBookDetailsQuery(id);
  const book = data?.data;
  // console.log(book)

  const [deleteBook] = useDeleteABookMutation();
  const [addWishlist, { isLoading: isAddingInWishlist }] =
    useAddUserWishlistMutation();

  if (isLoading) {
    return <Loading />;
  }

  const handleBookDelete = async (bookId: string | undefined) => {
    // Show a confirmation dialog to the user
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (isConfirmed && book?.user_email === currentUserEmail) {
      try {
        await deleteBook(bookId);
        toast.success("Book Deleted");
        return navigate("/all-books");
      } catch (error) {
        // Handle error here if needed
        console.error("Error Delete book:", error);
      }
    }
    return navigate("/sign-in");
  };

  // Handler to add book as wishlist
  const handleAddWishlist = async () => {
    // console.log("clicked");
    if (!token) {
      return navigate("/sign-in");
    }

    try {
      const res: any = await addWishlist({
        bookId: id,
        readerEmail: currentUserEmail,
      });
      // console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(
  //   book.wishlist.filter((wish: any) => wish.reader_email === currentUserEmail)
  //     .length > 0
  // );

  // Check is current user already has or not in wishlist
  const isCurrentUserInWishlist =
    book.wishlist.filter((wish: any) => wish.reader_email === currentUserEmail)
      .length > 0;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h1 className="text-2xl font-semibold mb-4">{book.title}</h1>
        <p className="text-gray-600 mb-2">Author: {book.author}</p>
        <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
        <p className="text-gray-600">
          {" "}
          Publication Date: {book.publication_date.split("T00")[0]}
        </p>
        <>
          {book?.user_email === currentUserEmail ? (
            <div className="mt-4 space-x-2">
              <Link
                to={`/edit-book/${id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleBookDelete(id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ) : (
            <>
              <div className="mt-4">
                {!isCurrentUserInWishlist ? (
                  <>
                    {isAddingInWishlist ? (
                      <LoadingButton />
                    ) : (
                      <button
                        disabled={isCurrentUserInWishlist}
                        onClick={handleAddWishlist}
                        className={`text-white px-4 py-2 rounded ${
                          isCurrentUserInWishlist
                            ? "bg-gray-500"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                      >
                        Add Wishlist
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <p className="mb-1 text-red-600">
                      Already added in wishlist
                    </p>
                    <Link
                      to={"/my-profile"}
                      className={`text-white px-4 py-2 rounded mt-4 bg-blue-500 hover:bg-blue-600
                    }`}
                    >
                      Check Wishlist
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <>
          {book?.reviews?.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              {book?.reviews.map(
                (
                  review: { user_email: string; comment: string },
                  idx: number
                ) => (
                  <div key={idx} className="border-b py-4">
                    <p className="text-gray-600 mb-1">
                      User: {review.user_email}
                    </p>
                    {/* <p className="mb-1">Rating: {review.rating} stars</p> */}
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                )
              )}
            </>
          )}
        </>

        <>
          {book?.user_email !== currentUserEmail && token ? (
            <SubmitReviewForm bookId={id} />
          ) : (
            ""
          )}
        </>
      </div>
    </div>
  );
}
