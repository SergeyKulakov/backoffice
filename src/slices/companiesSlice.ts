import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/companies";
import {
  getAllCompanies,
  getOneCompany,
  removeCompany,
  updateCompaniesTypes,
  getUnverifiedCompanies,
} from "../thunks/companies";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  company: null,
  companyItem: null,
  companyUnverified: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.company = action.payload;
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getOneCompany.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getOneCompany.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.companyItem = action.payload;
      })
      .addCase(getOneCompany.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(removeCompany.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(removeCompany.fulfilled, (state) => {
        state.isSuccess = true;
      })
      .addCase(removeCompany.rejected, (state) => {
        state.isSuccess = false;
      })
      .addCase(updateCompaniesTypes.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(updateCompaniesTypes.fulfilled, (state) => {
        state.isSuccess = true;
      })
      .addCase(updateCompaniesTypes.rejected, (state) => {
        state.isSuccess = false;
      })
      .addCase(getUnverifiedCompanies.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getUnverifiedCompanies.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.companyUnverified = action.payload;
      })
      .addCase(getUnverifiedCompanies.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
