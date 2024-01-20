import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./ui/__Loader/__Loader";

interface SignupFormInputs {
  email: string;
  password: string;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const base_url = import.meta.env.VITE_APP_BASE_API_URL;

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${base_url}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (res.ok) {
        const resData = await res.json();

        if (resData.success) {
          toast.success(resData?.message);
          navigate("/sign-in");
          // const loginUserData = await loginUserAfterSuccessfullySignedUp({
          //   userCredentials: resData.data,
          // });

          // if (loginUserData?.accessToken) {
          //   // Set accessToken in an HttpOnly cookie with expiration from the API response
          //   setCookie("accessToken", resData.data.accessToken);

          //   navigate("/");
          // }
        }
      } else {
        const errorData = await res.json();
        toast.warn(errorData?.message);
      }
    } catch (error) {
      toast.warn("Something went wrong during signup. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const loginUserAfterSuccessfullySignedUp = async (
  //   signedUpUserCredentials: any
  // ) => {
  //   try {
  //     const res = await fetch(`${base_url}/auth/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: signedUpUserCredentials?.email,
  //         password: signedUpUserCredentials?.password,
  //       }),
  //       credentials: "include",
  //     });

  //     const resData = await res.json();
  //     console.log(resData);
  //     return { accessToken: resData.data.accessToken };
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   }
  // };

  // Function to set an HttpOnly cookie
  // const setCookie = (name: string, value: string) => {
  //   document.cookie = `${name}=${value}; path=/; secure; HttpOnly; SameSite=Strict`;
  // };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  className="w-full border rounded p-2"
                />
                {errors.email && (
                  <span className="text-red-500">
                    This field is required and should be a valid email
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <input
                  {...register("password", { required: true, minLength: 6 })}
                  type="password"
                  className="w-full border rounded p-2"
                />
                {errors.password && (
                  <span className="text-red-500">
                    This field is required and should have at least 6 characters
                  </span>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
