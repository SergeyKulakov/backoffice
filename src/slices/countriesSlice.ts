import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/countries";
import {
  getAllDCountries,
  getOneCountry,
  removeCountries,
  updateCountries,
  getUnverifiedCities,
  getUnverifiedCountries,
} from "../thunks/countries";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  name: null,
  cities: [],
  names: null,
  cityUnverified: null,
  countryUnverified: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDCountries.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getAllDCountries.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.name = action.payload;
      })
      .addCase(getAllDCountries.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getOneCountry.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getOneCountry.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.names = action.payload;
      })
      .addCase(getOneCountry.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(removeCountries.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(removeCountries.fulfilled, (state) => {
        state.isSuccess = true;
      })
      .addCase(removeCountries.rejected, (state) => {
        state.isSuccess = false;
      })
      .addCase(getUnverifiedCountries.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getUnverifiedCountries.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.countryUnverified = action.payload;
      })
      .addCase(getUnverifiedCountries.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getUnverifiedCities.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getUnverifiedCities.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.cityUnverified = action.payload;
      })
      .addCase(getUnverifiedCities.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(updateCountries.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(updateCountries.fulfilled, (state) => {
        state.isSuccess = true;
      })
      .addCase(updateCountries.rejected, (state) => {
        state.isSuccess = false;
      });
  },
});

export const { reducer } = slice;
