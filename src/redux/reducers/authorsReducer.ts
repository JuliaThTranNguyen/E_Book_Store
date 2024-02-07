import { PayloadAction, createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Author, AuthorsReducerState } from "../../types/Author";
import { AuthorApiResponse, Pagination } from "../../types/Pagination";
import { RootStateType } from "../store";

const initialState: AuthorsReducerState = {
    authors: [],
    loading: false,
  }
  
  export const getAllAuthors = createAsyncThunk(
    "authors/getAllAuthors",
    async (page: number, { signal, rejectWithValue }) => {
      try {
        const response = await fetch(
          `https://nodejs-server-thjulia.vercel.app/api/v1/authors?page=${page}`,
          {
            signal,
          }
        );
  
        if (!response.ok) {
          throw new Error(`Failed to fetch authors. Status: ${response.status}`);
        }
  
        const data: AuthorApiResponse = await response.json();
  
        return {
          authors: data.data.authors,
          pagination: data.data.pagination,
        };
      } catch (error) {
        console.error("Error fetching authors:", error);
        return rejectWithValue("Error fetching authors");
      }
    }
  );
  export const setAllAuthors = createAction<Author[]>("authors/setAllAuthors");
  
  const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      /* GET ALL DATA FROM AUTHOR*/
      builder
      .addCase(getAllAuthors.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllAuthors.fulfilled,
        (
          state,
          action: PayloadAction<{ authors: Author[]; pagination: Pagination }>
        ) => {
          state.authors = action.payload.authors;
          state.pagination = action.payload.pagination;
          state.loading = false;
        }
      )
      .addCase(getAllAuthors.rejected, (state) => {
        state.loading = false;
      });
  
    builder.addCase(setAllAuthors, (state, action: PayloadAction<Author[]>) => {
      state.authors = action.payload;
      state.loading = false;
    });
    }
  })
  
  const authorsReducer = authorsSlice.reducer
  export default authorsReducer