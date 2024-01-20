import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialToken = Cookies.get("book-ctlg-accessToken") || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken,
  },

  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
