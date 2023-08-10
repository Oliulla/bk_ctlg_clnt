import { createSlice } from "@reduxjs/toolkit";
import { IBooks } from "../../../types/globalTypes";

interface IBookSlice {
  books: IBooks[];
}

const initialState: IBookSlice = {
  books: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
});

export default bookSlice.reducer;
