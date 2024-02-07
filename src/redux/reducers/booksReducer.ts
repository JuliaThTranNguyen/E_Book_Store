import {
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Book, BooksReducerState } from "../../types/Book";
import { BookApiResponse } from "../../types/Pagination";
import { RootStateType } from "../store";

const initialState: BooksReducerState = {
  books: [],
  loading: false,
  error: "",
};

export const getAllBooks = createAsyncThunk(
  "books/getAllBooks",
  async (_, { getState, signal, rejectWithValue }) => {
    try {
      const state = getState() as RootStateType;
      const totalPages = state.book.pagination?.totalPages || 3;

      let allBooks: Book[] = [];

      for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(
          `https://nodejs-server-thjulia.vercel.app/api/v1/books?page=${page}`,
          {
            signal,
          }
        );

        if (!response.ok) {
          console.error(`Failed to fetch books. Status: ${response.status}`);
        }

        const data: BookApiResponse = await response.json();
        allBooks = [...allBooks, ...data.data.books];
      }

      return allBooks;
    } catch (error) {
      console.error("Error fetching books:", error);
      return rejectWithValue("Error fetching books");
    }
  }
);
export const setAllBooks = createAction<Book[]>("books/setAllBooks");

const bookSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    /* GET ALL DATA FROM BOOK*/
    builder
    .addCase(getAllBooks.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAllBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    })
    .addCase(getAllBooks.rejected, (state) => {
      state.loading = false;
    });

  builder.addCase(setAllBooks, (state, action) => {
    state.books = action.payload;
    state.loading = false;
  });


  },
});

const booksReducer = bookSlice.reducer;
export const currentBooktotalPages = (state: RootStateType) =>
  state.book.pagination?.totalPages;
export default booksReducer;