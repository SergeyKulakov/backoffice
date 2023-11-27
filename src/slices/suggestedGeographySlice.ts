import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/suggested-geography";
import {
  getAllSuggestedGeography,
  getOneSuggestedGeography,
} from "../thunks/suggestedGeography";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  data: null,
  dataItem: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "geography",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSuggestedGeography.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getAllSuggestedGeography.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getAllSuggestedGeography.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getOneSuggestedGeography.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getOneSuggestedGeography.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.dataItem = action.payload;
      })
      .addCase(getOneSuggestedGeography.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
