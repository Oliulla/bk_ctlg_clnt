import { useForm } from 'react-hook-form';

interface BookFormData {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

export default function AddNewBookForm() {
  const { register, handleSubmit } = useForm<BookFormData>();

  const onSubmit = (data: BookFormData) => {
    console.log(data); // You can replace this with your logic to submit the form data
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
            {...register('title', { required: true })}
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
            {...register('author', { required: true })}
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
            {...register('genre', { required: true })}
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
            {...register('publicationDate', { required: true })}
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
