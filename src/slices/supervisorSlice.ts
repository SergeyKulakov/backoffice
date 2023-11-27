import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/supervisor";
import {
  getSupervisorBuyside,
  getSupervisorSellside,
} from "../thunks/supervisor";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  supervisorBuyside: null,
  supervisorSellside: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "supervisor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSupervisorBuyside.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getSupervisorBuyside.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.supervisorBuyside = action.payload;
      })
      .addCase(getSupervisorBuyside.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getSupervisorSellside.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getSupervisorSellside.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.supervisorSellside = action.payload;
      })
      .addCase(getSupervisorSellside.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
