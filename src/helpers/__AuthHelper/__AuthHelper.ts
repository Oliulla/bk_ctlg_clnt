import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthToken from "../../hooks/useAuthToken";

type IAuthGaurd = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthGaurd> = ({ children }) => {
  const token = useAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Redirect to home if there is already a token
      navigate("/sign-in");
    }

    // Return undefined to indicate no cleanup is needed
    return undefined;
  }, [token, navigate]);

  // Render the children if the user is authenticated
  return children;
};

export default AuthMiddleware;
