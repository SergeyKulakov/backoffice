import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/education";
import {
  getAllEducation,
  getOneEducation,
  getUnverifiedEducation,
} from "../thunks/education";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  education: null,
  educationItem: null,
  educationUnverified: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "education",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEducation.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getAllEducation.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.education = action.payload;
      })
      .addCase(getAllEducation.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getOneEducation.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getOneEducation.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.educationItem = action.payload;
      })
      .addCase(getOneEducation.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getUnverifiedEducation.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getUnverifiedEducation.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.educationUnverified = action.payload;
      })
      .addCase(getUnverifiedEducation.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
