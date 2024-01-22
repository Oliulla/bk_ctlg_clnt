import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { setToken, setUser } from "../redux/authSlice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../redux/apis/authApis";
import Loader from "./ui/__Loader/__Loader";

interface ILoginInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<ILoginInput>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLogin, { isLoading: isUserLoading }] = useUserLoginMutation();

  const onSubmit = async (data: ILoginInput) => {
    if (!data?.email || !data?.password)
      return toast.warning("Email & Password are required!");

    try {
      const res: any = await userLogin(data);

      // console.log("res", res);

      if (res?.data?.success === false) {
        toast.error(res?.data?.message);
      }

      if (res?.data?.success) {
        if (res?.data?.data?.accessToken) {
          // Set the accessToken in a cookie
          const token = res?.data?.data.accessToken;
          Cookies.set("book-ctlg-accessToken", token);
          dispatch(setToken(token));
          const jwtData = parseJwt(token);
          dispatch(setUser(jwtData));
          console.log("JWT DATA-->", jwtData);

          // Redirect to the customer dashboard
          navigate("/");
        }
      } else {
        console.error("Error logging in");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  function parseJwt(token: string) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    } catch (error) {
      // console.error("Error parsing JWT:", error);
      return null;
    }
  }

  return (
    <>
      {isUserLoading ? (
        <Loader />
      ) : (
        <>
          <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border rounded p-2"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full border rounded p-2"
                  {...register("password", { required: true })}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
