import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/counter";
import { getCountReseacrher, getCountSupervisor } from "../thunks/counter";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  dataResearcher: null,
  dataSupervisor: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "gender",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountReseacrher.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getCountReseacrher.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.dataResearcher = action.payload;
      })
      .addCase(getCountReseacrher.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getCountSupervisor.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getCountSupervisor.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.dataSupervisor = action.payload;
      })
      .addCase(getCountSupervisor.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
