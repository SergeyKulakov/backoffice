import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/language";
import {
  getAllLanguage,
  getOneLanguage,
  getUnverifiedLanguages,
} from "../thunks/language";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  language: null,
  languageItem: null,
  languagesUnverified: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "language",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLanguage.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getAllLanguage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.language = action.payload;
      })
      .addCase(getAllLanguage.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getUnverifiedLanguages.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getUnverifiedLanguages.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.languagesUnverified = action.payload;
      })
      .addCase(getUnverifiedLanguages.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getOneLanguage.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getOneLanguage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.languageItem = action.payload;
      })
      .addCase(getOneLanguage.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
