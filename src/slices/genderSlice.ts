import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/gender";
import { getAllGender, getOneGender } from "../thunks/gender";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  gender: null,
  genderItem: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "gender",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGender.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getAllGender.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.gender = action.payload;
      })
      .addCase(getAllGender.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getOneGender.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getOneGender.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.genderItem = action.payload;
      })
      .addCase(getOneGender.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
