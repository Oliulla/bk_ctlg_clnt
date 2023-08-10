import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useDeleteABookMutation,
  useGetBookDetailsQuery,
} from "../redux/api/apiSlice";
import Loading from "../components/ui/Loading";
import { toast } from "react-toastify";

export default function BookDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetBookDetailsQuery(id);
  const book = data?.data;
  // console.log(book)

  const [deleteBook] = useDeleteABookMutation();

  if (isLoading) {
    return <Loading />;
  }

  // Dummy reviews
  const reviews = [
    {
      id: 1,
      username: "User123",
      rating: 4,
      comment: "A captivating read. Highly recommended!",
    },
    {
      id: 2,
      username: "BookLover22",
      rating: 5,
      comment: "One of the best books I have ever read!",
    },
    // Add more reviews here
  ];

  const handleBookDelete = async (bookId: string | undefined) => {
    // Show a confirmation dialog to the user
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (isConfirmed) {
      try {
        await deleteBook(bookId);
        toast.success("Book Deleted");
        return navigate("/all-books");
      } catch (error) {
        // Handle error here if needed
        console.error("Error Delete book:", error);
      }
    }
  };

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

        <div className="mt-4 space-x-2">
          <Link
            to={`/edit-book/${id}`} // Replace with your edit book route
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
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className="border-b py-4">
            <p className="text-gray-600 mb-1">User: {review.username}</p>
            <p className="mb-1">Rating: {review.rating} stars</p>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}

        <form className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Submit a Review</h3>
          <textarea
            placeholder="Your review"
            className="border rounded p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
