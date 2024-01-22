import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import atob from "atob";

const parseJwt = (token: string) => {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");

    // Check if atob is available
    const decodedData =
      typeof atob === "function"
        ? atob(base64)
        : Buffer.from(base64, "base64").toString("utf-8");

    const userParseData = JSON.parse(decodedData);
    // console.log(userParseData);
    return userParseData;
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return null;
  }
};

// Get initial token and refresh token from cookies
const initialToken = Cookies.get("book-ctlg-accessToken") || null;

// Fetch the refresh token after the initial rendering (e.g., in a useEffect)
// const initialRefToken = Cookies.get("book-ctlg-refreshToken") || null;

// console.log("initialRefToken:", initialToken);

// Parse user details from the refresh token
const initialUser = parseJwt(initialToken as string) || {
  userEmail: null,
  iat: null,
  exp: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken,
    user: initialUser,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = {
        userEmail: action.payload.userEmail || null,
        iat: action.payload.iat || null,
        exp: action.payload.exp || null,
      };
    },
  },
});

// Export action creators and the reducer
export const { setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
