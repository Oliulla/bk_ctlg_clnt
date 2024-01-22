import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const useAuthToken = () => {
  const token = useSelector((state: RootState) => state.authSlice.token);

  return token;
};

export default useAuthToken;
