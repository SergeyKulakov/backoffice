import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/suggested-coverage";
import {
  getAllSuggestedCoverage,
  getOneSuggestedCoverage,
} from "../thunks/suggestedCoverage";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  data: null,
  dataItem: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "coverage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSuggestedCoverage.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getAllSuggestedCoverage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getAllSuggestedCoverage.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getOneSuggestedCoverage.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getOneSuggestedCoverage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.dataItem = action.payload;
      })
      .addCase(getOneSuggestedCoverage.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
