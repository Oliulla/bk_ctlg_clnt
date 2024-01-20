import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddNewBookMutation } from "../redux/apis/booksApi";

interface BookFormData {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
}

export default function AddNewBookForm() {
  const { register, handleSubmit, reset } = useForm<BookFormData>();

  const [addBook] = useAddNewBookMutation();

  const onSubmit = async (data: BookFormData) => {
    // console.log(data);

    try {
      await addBook(data);
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
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}
