import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Genre, GenresReducerState } from "../../types/Genre";
import { GenreApiResponse, Pagination } from "../../types/Pagination";
import { RootStateType } from "../store";

const initialState: GenresReducerState = {
  genres: [],
  loading: false,
};

export const getAllGenres = createAsyncThunk(
  "genres/getAllGenres",
  async (page: number, { signal, rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://nodejs-server-thjulia.vercel.app/api/v1/genres?page=${page}`,
        {
          signal,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch books. Status: ${response.status}`);
      }

      const data: GenreApiResponse = await response.json();

      return {
        genres: data.data.genres,
        pagination: data.data.pagination,
      };
    } catch (error) {
      console.error("Error fetching genres:", error);
      return rejectWithValue("Error fetching genres");
    }
  }
);
export const setAllGenres = createAction<Genre[]>("genres/setAllGenres");

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET ALL DATA FROM GENRES*/
    builder
      .addCase(getAllGenres.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllGenres.fulfilled,
        (
          state,
          action: PayloadAction<{ genres: Genre[]; pagination: Pagination }>
        ) => {
          state.genres = action.payload.genres;
          state.pagination = action.payload.pagination;
          state.loading = false;
        }
      )
      .addCase(getAllGenres.rejected, (state) => {
        state.loading = false;
      });

    builder.addCase(setAllGenres, (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
      state.loading = false;
    });
  },
});

const genresReducer = genresSlice.reducer;
// export const currentGenretotalPages = (state: RootStateType) =>
//   state.genre.pagination?.totalPages;
export default genresReducer;
