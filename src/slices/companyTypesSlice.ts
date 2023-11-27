import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/coompanyTypes";
import {
  getAllCompanyType,
  getOneCompanyType,
  removeCompanyType,
  updateCompanyType,
} from "../thunks/companyTypes";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  companyType: null,
  companyTypeItem: null,
  errorMessage: null,
  find: undefined,
};

export const slice = createSlice({
  name: "companyType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanyType.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getAllCompanyType.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.companyType = action.payload;
      })
      .addCase(getAllCompanyType.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getOneCompanyType.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getOneCompanyType.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.companyTypeItem = action.payload;
      })
      .addCase(getOneCompanyType.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(removeCompanyType.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(removeCompanyType.fulfilled, (state) => {
        state.isSuccess = true;
      })
      .addCase(removeCompanyType.rejected, (state) => {
        state.isSuccess = false;
      })
      .addCase(updateCompanyType.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(updateCompanyType.fulfilled, (state) => {
        state.isSuccess = true;
      })
      .addCase(updateCompanyType.rejected, (state) => {
        state.isSuccess = false;
      });
  },
});

export const { reducer } = slice;
