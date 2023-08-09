import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { dummyBooks } from "../components/RecentBooks";

interface BookFormData {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

export default function EditBookForm() {
  const { id } = useParams();
  const bookToEdit = dummyBooks.find((dbBook) => dbBook.id === Number(id));

  const { register, handleSubmit } = useForm<BookFormData>({
    defaultValues: bookToEdit, // Set the default values to the book being edited
  });

  const onSubmit = (data: BookFormData) => {
    console.log(data); // You can replace this with your logic to update the book data
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            htmlFor="publicationDate"
            className="block text-lg font-semibold mb-2"
          >
            Publication Date
          </label>
          <input
            type="date"
            id="publicationDate"
            {...register("publicationDate", { required: true })}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
}
