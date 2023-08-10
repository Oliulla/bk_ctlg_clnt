import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetBookDetailsQuery } from "../redux/api/apiSlice";
import Loading from "./ui/Loading";

interface BookFormData {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
}

export default function EditBookForm() {
  const { id } = useParams();
  const { data, isLoading } = useGetBookDetailsQuery(id);
  const bookToEdit = data?.data;

  console.log(bookToEdit)

  const { register, handleSubmit } = useForm<BookFormData>();

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = (data: BookFormData) => {
    console.log(data);
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
            defaultValue={bookToEdit.title}
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
            defaultValue={bookToEdit.author}
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
            defaultValue={bookToEdit.genre}
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
            type="text"
            id="publication_date"
            defaultValue={bookToEdit.publication_date.split("T00")[0]}
            {...register("publication_date", { required: true })}
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
