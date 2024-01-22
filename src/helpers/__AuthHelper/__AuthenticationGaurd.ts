import { useNavigate } from "react-router-dom";
import useAuthToken from "../../hooks/useAuthToken";
import { useEffect } from "react";

type IAuthGaurd = {
  children: React.ReactElement;
};

const AuthGaurd: React.FC<IAuthGaurd> = ({ children }) => {
  const token = useAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Redirect to home if there is already a token
      navigate("/");
    }

    // Return undefined to indicate no cleanup is needed
    return undefined;
  }, [token, navigate]);

  // Render the children if the user is unauthenticated
  return children;
};

export default AuthGaurd;
