import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/degree";
import {
  getAllDegree,
  getOneDegreeTypes,
  removeDegreeTypes,
  updateDegreeTypes,
  getUnverifiedDegree,
} from "../thunks/degree";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  degree: null,
  degreeItem: null,
  degreeUnverified: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "degree",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDegree.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getAllDegree.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.degree = action.payload;
      })
      .addCase(getAllDegree.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getOneDegreeTypes.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getOneDegreeTypes.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.degreeItem = action.payload;
      })
      .addCase(getOneDegreeTypes.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(removeDegreeTypes.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(removeDegreeTypes.fulfilled, (state) => {
        state.isSuccess = true;
      })
      .addCase(removeDegreeTypes.rejected, (state) => {
        state.isSuccess = false;
      })
      .addCase(updateDegreeTypes.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(updateDegreeTypes.fulfilled, (state) => {
        state.isSuccess = true;
      })
      .addCase(updateDegreeTypes.rejected, (state) => {
        state.isSuccess = false;
      })
      .addCase(getUnverifiedDegree.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getUnverifiedDegree.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.degreeUnverified = action.payload;
      })
      .addCase(getUnverifiedDegree.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
