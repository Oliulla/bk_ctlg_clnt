import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import AllBooks from "../pages/AllBooks";
import AddNewBook from "../pages/AddNewBook";
import BookDetailsPage from "../pages/BookDetailsPage";
import EditBook from "../pages/EditBook";
import UserProfile from "../pages/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/my-profile",
        element: <UserProfile />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/add-new-book",
        element: <AddNewBook />,
      },
      {
        path: "/book-details/:id",
        element: <BookDetailsPage />,
      },
      {
        path: "/edit-book/:id",
        element: <EditBook />,
      },
    ],
  },
]);
