import Wishlist, { StatusActions } from "../components/Wishlist";
import Loader from "../components/ui/__Loader/__Loader";
import useAuthEmail from "../hooks/useAuthEmail";
import { useGetAllBooksQuery } from "../redux/apis/booksApi";

// Construct book status name
export enum BookStatus {
  MY_WISHLIST = "My Wishlist",
  CURRENTLY_READING = "Currently Reading",
  PLAN_TO_READ = "Plan To Read",
  FINISHED_READING = "Finished Reading",
}

export default function UserProfile() {
  const { data, isLoading } = useGetAllBooksQuery({
    searchTerm: "",
    genre: "",
    publication_date: "",
  });
  const currentUserEmail = useAuthEmail();

  const books = data?.data;
  if (isLoading) {
    return <Loader />;
  }
  const userWishListBooks = books?.filter((book: any) =>
    book?.wishlist?.some((wish: any) => wish.reader_email === currentUserEmail)
  );

  const userCurrentlyReadingBooks = books.filter((book: any) =>
    book?.reading_status?.some(
      (st: any) =>
        st.status === BookStatus.CURRENTLY_READING &&
        st.reader_email === currentUserEmail
    )
  );
  const userPlanToReadBooks = books.filter((book: any) =>
    book?.reading_status?.some(
      (st: any) =>
        st.status === BookStatus.CURRENTLY_READING &&
        st.reader_email === currentUserEmail
    )
  );
  const userFinishedReadingBooks = books.filter((book: any) =>
    book?.reading_status?.some(
      (st: any) =>
        st.status === BookStatus.CURRENTLY_READING &&
        st.reader_email === currentUserEmail
    )
  );

  return (
    <div>
      <div className="mx-auto">
        {userWishListBooks?.length > 0 ? (
          <>
            <Wishlist
              bookStatusTxt={BookStatus.MY_WISHLIST}
              actions={[
                StatusActions.CURRENTLY_READING,
                StatusActions.PLAN_TO_READ_SOON,
              ]}
              books={userWishListBooks}
            />
          </>
        ) : userCurrentlyReadingBooks?.length > 0 ? (
          <>
            <Wishlist
              bookStatusTxt={BookStatus.MY_WISHLIST}
              actions={[
                StatusActions.CURRENTLY_READING,
                StatusActions.PLAN_TO_READ_SOON,
              ]}
              books={userCurrentlyReadingBooks}
            />
          </>
        ) : userPlanToReadBooks?.length > 0 ? (
          <>
            <Wishlist
              bookStatusTxt={BookStatus.MY_WISHLIST}
              actions={[
                StatusActions.CURRENTLY_READING,
                StatusActions.PLAN_TO_READ_SOON,
              ]}
              books={userPlanToReadBooks}
            />
          </>
        ) : userFinishedReadingBooks?.length > 0 ? (
          <>
            <Wishlist
              bookStatusTxt={BookStatus.MY_WISHLIST}
              actions={[
                StatusActions.CURRENTLY_READING,
                StatusActions.PLAN_TO_READ_SOON,
              ]}
              books={userFinishedReadingBooks}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
