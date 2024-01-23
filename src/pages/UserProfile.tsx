import Wishlist, { StatusActions } from "../components/Wishlist";
import Loader from "../components/ui/__Loader/__Loader";
import useAuthEmail from "../hooks/useAuthEmail";
import { useGetAllBooksQuery } from "../redux/apis/booksApi";

// Construct book status name
export enum BookStatus {
  MY_WISHLIST = "My Wishlist",
  CURRENTLY_READING = "Currently Reading",
  PLAN_TO_READ = "Plan To Read Soon",
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
  // console.log("books", books);
  const userWishListBooks = books?.filter((book: any) =>
    book?.wishlist?.some((wish: any) => wish.reader_email === currentUserEmail)
  );

  // console.log(books);

  const userCurrentlyReadingBooks = books?.filter((book: any) =>
    book?.reading_status?.some(
      (st: any) =>
        st.status === BookStatus.CURRENTLY_READING &&
        st.reader_email === currentUserEmail
    )
  );

  const userPlanToReadBooks = books?.filter((book: any) =>
    book?.reading_status?.some(
      (st: any) =>
        // console.log(st.status, BookStatus.PLAN_TO_READ)
        // console.log(st.reader_email, currentUserEmail)
        st.status === BookStatus.PLAN_TO_READ &&
        st.reader_email === currentUserEmail
    )
  );
  // console.log("Plan to read", userPlanToReadBooks);

  const userFinishedReadingBooks = books?.filter((book: any) =>
    book?.reading_status?.some(
      (st: any) =>
        st.status === BookStatus.FINISHED_READING &&
        st.reader_email === currentUserEmail
    )
  );

  return (
    <div>
      {userWishListBooks?.length === 0 &&
      userCurrentlyReadingBooks?.length === 0 &&
      userPlanToReadBooks?.length === 0 &&
      userFinishedReadingBooks?.length === 0 ? (
        <p className="text-2xl font-semibold text-center">No books found</p>
      ) : (
        <>
          <div className="mx-auto">
            <>
              {userWishListBooks?.length > 0 && (
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
              )}
            </>
            <>
              {userCurrentlyReadingBooks?.length > 0 && (
                <>
                  <Wishlist
                    bookStatusTxt={BookStatus.CURRENTLY_READING}
                    actions={[StatusActions.FINISHED_READING]}
                    books={userCurrentlyReadingBooks}
                  />
                </>
              )}
            </>

            <>
              {userPlanToReadBooks?.length > 0 && (
                <>
                  <Wishlist
                    bookStatusTxt={BookStatus.PLAN_TO_READ}
                    actions={[StatusActions.CURRENTLY_READING]}
                    books={userPlanToReadBooks}
                  />
                </>
              )}
            </>

            <>
              {userFinishedReadingBooks?.length > 0 && (
                <>
                  <Wishlist
                    bookStatusTxt={BookStatus.FINISHED_READING}
                    actions={[]}
                    books={userFinishedReadingBooks}
                  />
                </>
              )}
            </>
          </div>
        </>
      )}
    </div>
  );
}
