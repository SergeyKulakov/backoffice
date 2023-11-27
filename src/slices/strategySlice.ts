import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/suggested-strategy";
import { getAllStrategy, getOneStrategy } from "../thunks/suggestedStrategy";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  data: null,
  dataItem: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "strategy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStrategy.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getAllStrategy.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getAllStrategy.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getOneStrategy.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getOneStrategy.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.dataItem = action.payload;
      })
      .addCase(getOneStrategy.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
