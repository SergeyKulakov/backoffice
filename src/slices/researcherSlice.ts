import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/researcher";
import {
  getResearcherBuyside,
  getResearcherList,
  getResearcherSellside,
} from "../thunks/researcher";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  researcherBuyside: null,
  researcherSellside: null,
  researcherLists: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "researcher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getResearcherBuyside.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getResearcherBuyside.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.researcherBuyside = action.payload;
      })
      .addCase(getResearcherBuyside.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getResearcherList.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getResearcherList.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.researcherLists = action.payload;
      })
      .addCase(getResearcherList.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getResearcherSellside.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getResearcherSellside.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.researcherSellside = action.payload;
      })
      .addCase(getResearcherSellside.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
