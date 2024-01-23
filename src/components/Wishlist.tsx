import React, { FC, useState } from "react";
import { useChangeBookReadingStatusMutation } from "../redux/apis/booksApi";
import useAuthEmail from "../hooks/useAuthEmail";
import { toast } from "react-toastify";
import LoadingButton from "./ui/__Loader/__LoadingButton";

export enum StatusActions {
  CURRENTLY_READING = "Currently Reading",
  PLAN_TO_READ_SOON = "Plan To Read Soon",
  FINISHED_READING = "Finished Reading",
}

export enum WhislistActions {
  CURRENTLY_READING = "Currently Reading",
  PLAN_TO_READ_SOON = "Plan To Read Soon",
}

interface WishlistProps {
  bookStatusTxt: string;
  actions: StatusActions[] | WhislistActions[];
  books: any[];
}

const Wishlist: FC<WishlistProps> = ({ bookStatusTxt, actions, books }) => {
  const currentUserEmail = useAuthEmail();
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  const [changeBookStatus] = useChangeBookReadingStatusMutation();

  // Use an object to store selected status for each book
  const [selectedStatuses, setSelectedStatuses] = useState<{
    [key: string]: string;
  }>({});

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    bookId: string
  ) => {
    const selectedStatus = e.target.value;

    try {
      // Set loading state for the specific book to true
      setLoadingStates((prev) => ({ ...prev, [bookId]: true }));

      // Set selected status for the specific book
      setSelectedStatuses((prev) => ({ ...prev, [bookId]: selectedStatus }));

      const res: any = await changeBookStatus({
        bookId,
        readerEmail: currentUserEmail,
        status: selectedStatus,
      });

      if (res.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Set loading state for the specific book back to false
      setLoadingStates((prev) => ({ ...prev, [bookId]: false }));
    }
  };

  return (
    <div className="p-4 border w-full mx-auto">
      <div>
        <h2 className="text-2xl font-semibold mb-4">{bookStatusTxt}</h2>
        <ul className="list-disc px-6">
          {books.map((book: any) => (
            <li className="mb-2 py-4 px-2 bg-white shadow-2xl" key={book._id}>
              <span className="font-semibold">{book?.title}</span> -{" "}
              <span>{book?.author}</span>
              <div className="flex space-x-2 mt-2">
                {loadingStates[book.id] ? (
                  <LoadingButton />
                ) : (
                  <select
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                    onChange={(e) => handleStatusChange(e, book.id)}
                    value={selectedStatuses[book.id] || ""}
                    disabled={bookStatusTxt === StatusActions.FINISHED_READING}
                  >
                    <>
                      <option value="" disabled>
                        {bookStatusTxt === StatusActions.FINISHED_READING
                          ? StatusActions.FINISHED_READING
                          : "Select Status"}
                      </option>
                      {actions?.map((action, i) => (
                        <option key={i} value={action}>
                          {action}
                        </option>
                      ))}
                    </>
                  </select>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wishlist;
