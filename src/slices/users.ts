import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUsers,
  getSearchProfile,
  getUserInfo,
  userList,
} from "../thunks/userList";
import { AuthState } from "../types/user";

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  user: null,
  userInfo: null,
  searchInfo: null,
  errorMessage: null,
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userList.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(userList.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.errorMessage = null;
      })
      .addCase(userList.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getSearchProfile.pending, (state) => {
        state.isSuccess = false;
        state.errorMessage = null;
      })
      .addCase(getSearchProfile.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.searchInfo = action.payload;
      })
      .addCase(getSearchProfile.rejected, (state, action) => {
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reducer } = slice;
