import { useNavigate } from "react-router-dom";
import { store } from "../../redux/store/store";

type IAuthGaurd = {
  children: React.ReactElement;
};

const AuthGaurd: React.FC<IAuthGaurd> = ({ children }) => {
  const token = store.getState().authSlice.token;
  const navigate = useNavigate();

  if (token) {
    // Redirect to hpme if there already have token
    navigate("/");
    // Render nothing while redirecting
    return null;
  }

  // Render the children if the user is unauthenticated
  return children;
};

export default AuthGaurd;
