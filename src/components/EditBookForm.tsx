import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loading from "./ui/Loading";
import {
  useGetBookDetailsQuery,
  useUpdateABookMutation,
} from "../redux/apis/booksApi";
import LoadingButton from "./ui/__Loader/__LoadingButton";
import { toast } from "react-toastify";

interface BookFormData {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
}

export default function EditBookForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetBookDetailsQuery(id);
  const bookToEdit = data?.data;
  const [updateBook, { isLoading: isUpdating }] = useUpdateABookMutation();

  // console.log(bookToEdit)

  const { register, handleSubmit } = useForm<BookFormData>();

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = async (data: BookFormData) => {
    try {
      const res: any = await updateBook({ id, data });
      if (!res.data.success) {
        toast.success(res.data?.message);
        return;
      }

      toast.success(res.data?.message);
      return navigate("/all-books");
    } catch (error) {
      console.log("Updated failed:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold mb-2">
            Title <span className="text-red-500">*</span>
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
            Author <span className="text-red-500">*</span>
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
            Genre <span className="text-red-500">*</span>
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
            Publication Date <span className="text-red-500">*</span>
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
          {isUpdating ? (
            <LoadingButton />
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
