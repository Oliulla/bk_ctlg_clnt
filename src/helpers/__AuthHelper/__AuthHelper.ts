import { useNavigate } from "react-router-dom";
import { store } from "../../redux/store/store";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const token = store.getState().authSlice.token;
  const navigate = useNavigate();

  if (!token) {
    // Redirect to login if there is no token
    navigate("/sign-in");
    // Render nothing while redirecting
    return null;
  }

  // Render the children if the user is authenticated
  return children;
};

export default AuthMiddleware;
