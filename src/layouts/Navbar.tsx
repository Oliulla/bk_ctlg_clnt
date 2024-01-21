import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { setToken } from "../redux/authSlice/authSlice";
import { useState } from "react";
// import { apiOperationMethods } from "../constants/apiOperationMethods";
import { toast } from "react-toastify";
import { useUserLogOutMutation } from "../redux/apis/authApis";

export default function Navbar() {
  const dispatch = useDispatch();
  const [isLogOut, setIsLogOut] = useState<Boolean>(false);
  const [userLogOut, { isLoading: isUserLogoutLoading }] =
    useUserLogOutMutation();

  // Handle admin logout
  const handleSignOut = async () => {
    dispatch(setToken(null));
    Cookies.set("book-ctlg-accessToken", "");
    // Cookies.set("book-ctlg-refreshToken", "", {
    //   domain: "http://localhost:3000",
    //   path: "/",
    // });

    // const res = await fetch("http://localhost:5000/api/v1/auth/log-out", {
    //   method: apiOperationMethods.POST,
    //   credentials: "include",
    // });

    // // console.log("res -->", res);
    // const data = await res.json();

    const res: any = await userLogOut({});

    // console.log("res data -->", data);
    toast.success(res?.data?.message);

    setIsLogOut(true);
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">
          <Link to="/">Book Catalog</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/all-books" className="text-white hover:underline">
              All Books
            </Link>
          </li>
          <li>
            <Link to="/add-new-book" className="text-white hover:underline">
              Add New Book
            </Link>
          </li>
          <li>
            <Link to="/sign-in" className="text-white hover:underline">
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/sign-up" className="text-white hover:underline">
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/my-profile" className="text-white hover:underline">
              My Profile
            </Link>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              type="submit"
              className="bg-red-900 text-white px-2"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
