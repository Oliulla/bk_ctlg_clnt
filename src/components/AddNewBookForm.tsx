import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddNewBookMutation } from "../redux/apis/booksApi";
import useAuthEmail from "../hooks/useAuthEmail";
import LoadingButton from "./ui/__Loader/__LoadingButton";
// import { useGetSingleUserByEmailQuery } from "../redux/apis/usersApi";

interface BookFormData {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
}

export default function AddNewBookForm() {
  const { register, handleSubmit, reset } = useForm<BookFormData>();
  const loginUserEmail: string = useAuthEmail();
  // const { data: currentUser, isLoading } = useGetSingleUserByEmailQuery({email: loginUserEmail});

  // console.log(loginUserEmail);

  const [addBook, { isLoading: isNewBookAddLoading = true}] = useAddNewBookMutation();

  const onSubmit = async (data: BookFormData) => {
    // console.log(data);

    const bookData: BookFormData & { user_email: string } = {
      ...data,
      user_email: loginUserEmail,
    };

    try {
      await addBook(bookData);
      toast.success("Book added");
      reset();
    } catch (error) {
      // Handle error here if needed
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add A New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            placeholder="Enter title"
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-lg font-semibold mb-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            {...register("author", { required: true })}
            placeholder="Enter author"
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="genre" className="block text-lg font-semibold mb-2">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            {...register("genre", { required: true })}
            placeholder="Enter genre"
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="publication_date"
            className="block text-lg font-semibold mb-2"
          >
            Publication Date
          </label>
          <input
            type="date"
            id="publication_date"
            {...register("publication_date", { required: true })}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-right">
          {isNewBookAddLoading ? (
            <LoadingButton />
          ) : (
            <button
              type="submit"
              className=" bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
            >
              Add Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
