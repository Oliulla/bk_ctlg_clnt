import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const useAuthEmail = () => {
  const loginUserEmail = useSelector(
    (state: RootState) => state.authSlice.user.userEmail
  );

  return loginUserEmail;
};

export default useAuthEmail;
