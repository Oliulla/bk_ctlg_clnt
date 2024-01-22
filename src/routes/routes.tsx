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
import AuthGaurd from "../helpers/__AuthHelper/__AuthenticationGaurd";
import AuthMiddleware from "../helpers/__AuthHelper/__AuthHelper";

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
        element: (
          <AuthGaurd>
            <SignUp />
          </AuthGaurd>
        ),
      },
      {
        path: "/sign-in",
        element: (
          <AuthGaurd>
            <Login />
          </AuthGaurd>
        ),
      },
      {
        path: "/my-profile",
        element: (
          <AuthMiddleware>
            <UserProfile />
          </AuthMiddleware>
        ),
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/add-new-book",
        element: (
          <AuthMiddleware>
            <AddNewBook />
          </AuthMiddleware>
        ),
      },
      {
        path: "/book-details/:id",
        element: <BookDetailsPage />,
      },
      {
        path: "/edit-book/:id",
        element: (
          <AuthMiddleware>
            <EditBook />
          </AuthMiddleware>
        ),
      },
    ],
  },
]);
