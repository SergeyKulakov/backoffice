import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/diversity";
import { getAllDiversity, getOneDiversity } from "../thunks/diversity";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  diversity: null,
  diversityItem: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "language",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDiversity.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getAllDiversity.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.diversity = action.payload;
      })
      .addCase(getAllDiversity.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getOneDiversity.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getOneDiversity.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.diversityItem = action.payload;
      })
      .addCase(getOneDiversity.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
