import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovieById, getMoviesByQuery } from "../../api";

export const fetchMovies = createAsyncThunk(
  "fetchMovies",
  async ({ page, query }) => {
    try {
      return await getMoviesByQuery(page, query);
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong");
    }
  }
);

export const fetchMovieById = createAsyncThunk("fetchMovieById", async (id) => {
  try {
    return await getMovieById(id);
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
});

const initialState = {
  query: null,
  data: [],
  isLoading: false,
  error: null,
  page: 1,
  hasNextPage: false,
  selectedMovie: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
      state.page = 1;
      state.data = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { query } = action.meta.arg;
        if (action.payload.Response === "True") {
          state.data = state.data.concat(action.payload.Search);
          state.hasNextPage = state.data.length !== action.payload.totalResults;
        } else {
          state.error = action.payload?.Error;
          state.hasNextPage = false;
        }

        if (!state.query) {
          state.query = query;
        }
        state.page += 1;
        state.isLoading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.selectedMovie = null;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.Response === "True") {
          state.selectedMovie = action.payload;
        } else {
          state.error = action.payload?.Error;
        }
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setQuery } = movieSlice.actions;
export default movieSlice.reducer;
